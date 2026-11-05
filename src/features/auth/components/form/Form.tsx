export default function Form({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">{title}</h2>
        <p className="form-subtitle">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
