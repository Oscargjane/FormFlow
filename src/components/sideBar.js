import { UserButton } from '@clerk/nextjs';

const SideBar = () => {
  return (
    <>
      <UserButton
        afterSignOutUrl="/sign-in"
        // appearance={{
        //   elements: {
        //     formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm normal-case',
        //   },
        // }}
      />
      <div>SideBar Content</div>
    </>
  );
};

export default SideBar;
