import logo from "../assets/company-logo.svg";

export default function Header() {
  return (
    <header className="flex items-center gap-3 mb-6">
      <img src={logo} alt="Company Logo" className="h-10" />
    </header>
  );
}
