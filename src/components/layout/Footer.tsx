const Footer = () => {
  return (
    <footer className="bg-card border-t border-border shadow-sm">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Team 8. All rights reserved. PurrfectMatch.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
