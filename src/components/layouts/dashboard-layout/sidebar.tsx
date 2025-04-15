import { Navigation } from "./sidebar-navigation";

type SidebarProps = {
  isOpen: boolean;
};

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 z-20 flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } pt-16 lg:pt-0`}
    >
      <Navigation />
    </aside>
  );
}
