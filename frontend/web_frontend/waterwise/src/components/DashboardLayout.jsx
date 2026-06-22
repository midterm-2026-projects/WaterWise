import { dashboardSections } from "../data/layout";

const DashboardLayout = () => {
  return (
    <div>
      {dashboardSections.map((section) => (
        <h2 key={section}>{section}</h2>
      ))}
    </div>
  );
};

export default DashboardLayout;