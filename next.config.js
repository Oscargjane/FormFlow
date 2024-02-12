/** @type {import('next').NextConfig} */
const nextConfig = {
  // Define las redirecciones
  async redirects() {
    return [
      {
        // Si el usuario accede a la ruta raíz ('/'), será redirigido a '/sign-in'
        source: '/',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
  // Configura las opciones de las imagenes
  images: {
    // Permite cargar imágenes desde 'img.clerk.com'
    domains: ['img.clerk.com'],
  },
};

module.exports = nextConfig;
