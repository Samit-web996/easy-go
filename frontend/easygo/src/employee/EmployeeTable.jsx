import { useState, useMemo, useEffect } from "react";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) document.addEventListener("click", close,true);
    return () => document.removeEventListener("click", close,true);
  }, [open]);

  return (
    <div className="relative flex justify-end">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="p-1 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="8" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="16" cy="12" r="1" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-8 z-50 w-36 rounded-lg border border-white/10 bg-zinc-900 shadow-xl overflow-hidden"
        >
          {[
            { label: "View",  action: onView },
            { label: "Edit",  action: onEdit },
            { label: "Delete",action: onDelete, danger: true },
          ].map(({ label, icon, action, danger }) => (
            <button
              key={label}
              onClick={() => {
                action?.();
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                ${
                  danger
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-gray-300 hover:bg-white/5"
                }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // ─── Fetch employees from backend ───────────────────────────────────────────
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3006/employees");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ─── Role update ─────────────────────────────────────────────────────────────
  const handleRoleChange = async (eid, role) => {

  // 🔹 UI instantly update without table reload
  setData((prevData) =>
    prevData.map((emp) =>
      emp.eid === eid ? { ...emp, role: role } : emp
    )
  );

  try {
    const res = await fetch("http://localhost:3006/update-role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eid, role }),
    });

    if (!res.ok) throw new Error("Update failed");

  } catch (err) {
    console.error("Role update failed:", err.message);
  }
};

  // ─── Filter ──────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (p) =>
        String(p.eid).includes(q) ||
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.mobile?.toLowerCase().includes(q) ||
        p.role?.toLowerCase().includes(q) ||
        String(p.salary).includes(q),
    );
  }, [search, data]);

  // ─── Sort ────────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ─── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pageData = sorted.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );

  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }) {
    if (sortKey !== col) return <span className="text-gray-600 ml-1">↕</span>;
    return (
      <span className="text-blue-400 ml-1">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  const COLUMNS = [
    { label: "EID", key: "eid" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobile" },
    { label: "Salary", key: "salary" },
    { label: "DOJ", key: "joining_Date" },
    { label: "Role", key: "role" },
    { label: "", key: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
         
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} records
          </span>
        </div>

        {/* Search + Page size */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div
            className="flex items-center gap-2 w-64 px-3 py-2 rounded-lg
            border border-gray-300 dark:border-white/10
            bg-white dark:bg-[#0d1117]
            focus-within:ring-2 focus-within:ring-blue-500 transition-all"
          >
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="px-3 py-2 rounded-lg text-sm border
              border-gray-300 dark:border-white/10
              bg-white dark:bg-[#0d1117]
              text-gray-900 dark:text-white
              outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                Show {s}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-[#161b27]">
                  {COLUMNS.map(({ label, key }) => (
                    <th
                      key={label}
                      onClick={() => key && handleSort(key)}
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider
                        text-gray-500 dark:text-gray-400
                        ${key ? "cursor-pointer hover:text-gray-800 dark:hover:text-white select-none" : ""}
                        transition-colors`}
                    >
                      {label}
                      {key && <SortIcon col={key} />}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Loading state */}
                {loading && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Loading employees...
                      </div>
                    </td>
                  </tr>
                )}
                {/* Empty state */}
                {!loading && !error && pageData.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}

                {/* Data rows */}
                {!loading &&
                  !error &&
                  pageData.map((emp, i) => (
                    <tr
                      key={emp.eid}
                        className={`border-t border-gray-100 dark:border-white/5
                        hover:bg-gray-100 dark:hover:bg-[#1a2333] transition-colors
                        ${i % 2 === 0 ? "bg-white dark:bg-[#0d1117]" : "bg-gray-50 dark:bg-[#0f1520]"}`}
                    >
                      <td className="px-4 py-3">
                        <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                          #{String(emp.eid).padStart(3, "0")}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {emp.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.mobile}
                      </td>
                      <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">
                        ₹{emp.salary?.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.joining_Date
                          ? new Date(emp.joining_Date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={emp.role || ""}
                          onChange={(e) =>
                            handleRoleChange(emp.eid, e.target.value)
                          }
                          className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700
                          text-gray-900 dark:text-gray-200 rounded-lg px-2 py-1 text-xs outline-none
                          focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="" disabled>
                            Select Role
                          </option>
                          {[
                            "Admin",
                            "Finance Manager",
                            "Payroll Executive",
                            "Account Executive",
                            "Chartered Accountant",
                            "Manager",
                            "Digital Marketing Executive",
                            "Social Media Executive",
                            "Marketing Executive",
                            "Booking Management",
                            "Drivers Manager",
                            "Drivers",
                            "Vehicle Manager",
                            "Vehicle Engineer",
                            "Mechanic",
                            "Hiring Staff",
                            "Hiring Driver",
                            "Frontend Developer",
                            "App Developer",
                            "Backend Developer",
                          ].map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <ActionMenu
                          onView={() => alert(`Viewing: ${emp.name}`)}
                          onEdit={() => alert(`Editing: ${emp.name}`)}
                          onDelete={() => alert(`Deleting: ${emp.name}`)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="text-gray-800 dark:text-white font-medium">
              {currentPage + 1}
            </span>{" "}
            of{" "}
            <span className="text-gray-800 dark:text-white font-medium">
              {totalPages}
            </span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-4 py-1.5 rounded-lg border text-sm transition-all
                border-gray-300 dark:border-white/10
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="px-4 py-1.5 rounded-lg border text-sm transition-all
                border-gray-300 dark:border-white/10
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
