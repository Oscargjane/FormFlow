import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createUser, updateUser, deleteUser } from '@/app/lib/actions/user.actions.js';

export async function POST(req, res) {
  // Define el secreto del webhook a partir de las variables de entorno
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  // Obtiene los encabezados de la solicitud
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Si no hay encabezados, devuelve un error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send('Error: Invalid headers');
    return;
  }

  // Obtiene el cuerpo de la solicitud
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Crea una nueva instancia de Svix con el secreto
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verifica el playload con los encabezados
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    res.status(400).send('Error: Invalid signature');
    return;
  }

  // Obtiene el ID, los datos y el tipo de evento
  const id = evt.id;
  const data = JSON.stringify(evt.data);
  const eventType = evt.type;

  // Objeto de mapeo para los tipos de eventos y las acciones del servidor correspondientes
  const eventHandlers = {
    'user.created': createUser,
    'user.updated': updateUser,
    'user.deleted': deleteUser,
  };

  // Si el tipo de evento no tiene un manejador, devuelve un error
  if (!eventHandlers[eventType]) {
    res.status(400).send(`Error: Unsupported event type ${eventType}`);
    return;
  }

  // Maneja los eventos de Clerk utilizando las acciones del servidor
  try {
    await eventHandlers[eventType](id, data);
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).send('Error: Failed to process event');
    return;
  }

  res.status(200).send('Webhook processed');
}
