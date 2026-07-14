import { useState, useMemo, useEffect } from "react";
import ViewEmployeeModal from "./View";
import EditEmployeeModal from "./Edit";
import { Eye, Pencil } from "lucide-react";
import API from "../api";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEmp, setEditEmp] = useState([]);
  const [role, setRole] = useState([]);
  const [dept, setDept] = useState([]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await API.get("/employees");

      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get("/get-role");
      setRole(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchDept = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get("/get-dept");
      setDept(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDept();
  }, []);

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

  async function viewEmployee(eid) {
    if (eid === undefined || eid === null) return;
    try {
      const res = await API.get(`/get-employee/${eid}`);
      const empData = Array.isArray(res.data) ? res.data[0] : res.data;
      setSelectedEmp(empData);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditClick = (emp) => {
    setEditEmp(emp);
    setIsEditModalOpen(true);
  };

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
    { label: "", key: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {filtered.length} records found
          </span>
        </div>

        {/* Search + Page size controls adjustments */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
          <div
            className="flex items-center gap-2 w-full sm:w-72 px-3 py-2.5 sm:py-2 rounded-xl
            border border-gray-200 dark:border-white/10
            bg-white dark:bg-[#0d1117]
            focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm"
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
              placeholder="Search data records..."
              className="bg-transparent outline-none text-sm w-full text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="px-3 py-2.5 sm:py-2 rounded-xl text-sm border
              border-gray-200 dark:border-white/10
              bg-white dark:bg-[#0d1117]
              text-gray-900 dark:text-white
              outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm text-center sm:text-left"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                Show {s} entries
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#0d1117] overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#161b27] border-b border-gray-200 dark:border-white/10">
                  {COLUMNS.map(({ label, key }) => (
                    <th
                      key={label || "actions"}
                      onClick={() => key && handleSort(key)}
                      className={`px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider
                        text-gray-500 dark:text-gray-400
                        ${key ? "cursor-pointer hover:text-gray-900 dark:hover:text-white select-none" : ""}
                        transition-colors`}
                    >
                      {label}
                      {key && <SortIcon col={key} />}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-300">
                {/* Loading state */}
                {loading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4 text-blue-500"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading operational matrix...
                      </div>
                    </td>
                  </tr>
                )}

                {/* Empty state */}
                {!loading && !error && pageData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400 font-medium"
                    >
                      No records matched the criteria.
                    </td>
                  </tr>
                )}

                {/* Data rows */}
                {!loading &&
                  !error &&
                  pageData.map((emp, i) => (
                    <tr
                      key={emp.eid}
                      className={`border-b border-gray-100 dark:border-white/5
                        hover:bg-gray-50 dark:hover:bg-[#1a2333]/40 transition-colors
                        ${i % 2 === 0 ? "bg-white dark:bg-[#0d1117]" : "bg-gray-50/40 dark:bg-[#0f1520]/40"}`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                          #{String(emp.eid).padStart(3, "0")}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-gray-900 dark:text-white">
                        {emp.name}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-gray-600 dark:text-gray-300">
                        {emp.email}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-gray-600 dark:text-gray-300">
                        {emp.mobile}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {/* View Button */}
                          <button
                            onClick={() => viewEmployee(emp.eid)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 
                              bg-blue-50 hover:bg-blue-100 text-blue-600 
                              dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400
                              border border-blue-200/60 dark:border-blue-800/60 shadow-sm active:scale-95 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditClick(emp)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 
                              bg-amber-50 hover:bg-amber-100 text-amber-600 
                              dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:text-amber-400
                              border border-amber-200/60 dark:border-amber-800/60 shadow-sm active:scale-95 cursor-pointer"
                            title="Edit Employee"
                          >
                            <Pencil size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm px-1">
          <span className="text-gray-500 dark:text-gray-400 font-medium order-2 sm:order-1">
            Showing Page{" "}
            <span className="text-gray-800 dark:text-white font-bold">
              {currentPage + 1}
            </span>{" "}
            of{" "}
            <span className="text-gray-800 dark:text-white font-bold">
              {totalPages}
            </span>
          </span>
          <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border text-sm transition-all font-semibold
                border-gray-300 dark:border-white/10
                text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0d1117]
                hover:bg-gray-100 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border text-sm transition-all font-semibold
                border-gray-300 dark:border-white/10
                text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0d1117]
                hover:bg-gray-100 dark:hover:bg-white/5
                disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              Next
            </button>
          </div>
        </div>

        <EditEmployeeModal
          isOpen={isEditModalOpen}
          editEmp={editEmp}
          setEditEmp={setEditEmp}
          onClose={() => setIsEditModalOpen(false)}
          roles={role}
          depts={dept}
          onUpdateSuccess={fetchEmployees}
        />

        <ViewEmployeeModal
          isOpen={isModalOpen}
          employee={selectedEmp}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
