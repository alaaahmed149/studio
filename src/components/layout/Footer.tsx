const Footer = () => {
  return (
    <footer className="bg-card border-t border-border shadow-sm">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} فريق 8. جميع الحقوق محفوظة. مواءمة مثالية.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

