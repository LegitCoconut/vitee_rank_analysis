export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/80 backdrop-blur-sm text-muted-foreground py-4 mt-12 border-t border-border/50"> {/* Updated background for dark theme, added border, increased margin */}
      <div className="container mx-auto text-center text-sm">
        © {currentYear} VIT Rank Predictor. All rights reserved.
        <p className="text-xs mt-1">Disclaimer: This tool provides estimations based on available data and previous year trends. It is not an official VIT resource. Always refer to official VIT announcements for accurate information.</p>
      </div>
    </footer>
  );
}
