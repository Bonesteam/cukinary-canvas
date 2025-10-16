export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <small>© {year} RISEWYNN LIMITED</small>
      </div>
    </footer>
  );
}
