export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-space-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted-foreground/30 border-t-foreground"></div>
      <p
        className="text-[length:var(--text-base)] tracking-widest text-muted-foreground animate-pulse"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        LOADING...
      </p>
    </div>
  );
}
