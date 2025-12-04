export default function Sidebar() {
  return (
    <aside className="w-64 h-full border-r bg-gray-50 p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>

      <ul className="space-y-3">
        <li className="text-gray-700 hover:text-black cursor-pointer">
          Job Application Form
        </li>
        <li className="text-gray-700 hover:text-black cursor-pointer">
          Submissions
        </li>
        <li className="text-gray-700 hover:text-black cursor-pointer">
          Profile
        </li>
      </ul>
    </aside>
  );
}
