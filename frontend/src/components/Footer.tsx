const Footer = () => {
  return (
    <footer className="border-t bg-muted mt-10">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GymTracker. Built with 💪 by Eid
      </div>
    </footer>
  );
};

export default Footer;
