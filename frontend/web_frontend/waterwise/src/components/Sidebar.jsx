const Sidebar = ({ items = [] }) => {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;