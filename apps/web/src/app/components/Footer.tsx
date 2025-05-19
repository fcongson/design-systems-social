"use client";

export const Footer = () => {
  return (
    <footer
      className="container"
      style={{
        padding: "var(--spacing-md) 0",
        marginTop: "var(--spacing-2xl)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text-light)",
        textAlign: "center",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} DesignSystems.social | All rights
        reserved.
      </p>
    </footer>
  );
};
