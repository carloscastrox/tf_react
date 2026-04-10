import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  // Catálogos (puedes conectarlos luego a tu API)
  const categories = useMemo(
    () => ["Alimentación", "Transporte", "Servicios", "Ocio", "Salud", "Otros"],
    []
  );
  const responsibles = useMemo(() => ["Carlos", "María", "Juan"], []);

  // Filtro Mes/Año (yyyy-mm)
  const todayMonth = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(todayMonth);

  // Form state
  const [form, setForm] = useState({
    date: "",
    category: "",
    value: "",
    description: "",
    responsible: "",
  });

  // Data
  const [expenses, setExpenses] = useState([]);
  const [saving, setSaving] = useState(false);

  // Helpers
  const currency = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));

  const isSameMonth = (dateStr, yyyyMm) => dateStr?.slice(0, 7) === yyyyMm;

  const expensesInPeriod = useMemo(
    () => expenses.filter((e) => isSameMonth(e.date, month)),
    [expenses, month]
  );

  const totalGeneral = useMemo(
    () => expensesInPeriod.reduce((acc, e) => acc + Number(e.value || 0), 0),
    [expensesInPeriod]
  );

  const totalsByResponsible = useMemo(() => {
    const map = {};
    for (const e of expensesInPeriod) {
      map[e.responsible] = (map[e.responsible] || 0) + Number(e.value || 0);
    }
    return map;
  }, [expensesInPeriod]);

  const activeResponsibles = useMemo(() => {
    const keys = Object.keys(totalsByResponsible);
    return keys.length ? keys : responsibles;
  }, [totalsByResponsible, responsibles]);

  const cuota = useMemo(() => {
    const n = activeResponsibles.length || 1;
    return totalGeneral / n;
  }, [totalGeneral, activeResponsibles]);

  const totalsByCategory = useMemo(() => {
    const map = {};
    for (const e of expensesInPeriod) {
      map[e.category] = (map[e.category] || 0) + Number(e.value || 0);
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expensesInPeriod]);

  // Validaciones (solo Bootstrap feedback)
  const errors = useMemo(() => {
    const e = {};
    if (!form.date) e.date = "La fecha es obligatoria";
    if (!form.category) e.category = "Selecciona una categoría";
    if (!form.value) e.value = "El valor es obligatorio";
    if (form.value && Number(form.value) <= 0) e.value = "El valor debe ser mayor a 0";
    if (!form.description.trim()) e.description = "La descripción es obligatoria";
    if (!form.responsible) e.responsible = "Selecciona un responsable";
    return e;
  }, [form]);

  const formValid = Object.keys(errors).length === 0;

  const onChange = (key) => (ev) =>
    setForm((prev) => ({ ...prev, [key]: ev.target.value }));

  const handleSave = async (ev) => {
    ev.preventDefault();
    if (!formValid) return;

    try {
      setSaving(true);
      await new Promise((r) => setTimeout(r, 250)); // simulación

      const newExpense = {
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        date: form.date,
        category: form.category,
        value: Number(form.value),
        description: form.description.trim(),
        responsible: form.responsible,
      };

      setExpenses((prev) => [newExpense, ...prev]);
      setForm({ date: "", category: "", value: "", description: "", responsible: "" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  const badgeSaldo = (saldo) => {
    if (saldo > 0) return "text-bg-success-subtle text-success border border-success-subtle";
    if (saldo < 0) return "text-bg-danger-subtle text-danger border border-danger-subtle";
    return "text-bg-secondary-subtle text-secondary border border-secondary-subtle";
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar sesión
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");

    // Redirigir a login
    navigate("/login");
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-dark">

      <section className="bg-dark text-light border-bottom sticky-top">
        <div className="container py-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">

            {/* Izquierda */}
            <div className="flex-grow-1">
              <h2 className="fw-bold mb-1">Gastos Diarios</h2>
              <div className="text-ligth">
                Control de gastos por periodo · Totales · Saldos · Liquidación
              </div>
            </div>

            {/* Derecha (Acciones + Card Mes/Año) */}
            <div className="d-flex flex-column align-items-stretch align-items-lg-end gap-2 w-100">

              <button
                type="button"
                className="btn btn-primary btn-sm d-inline-flex align-items-center justify-content-center gap-1"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right" aria-hidden="true" />
                Cerrar sesión
              </button>

              {/* Card Mes/Año */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-3">
                  <div className="small text-muted fw-semibold mb-2">Mes/Año</div>

                  <div className="input-group flex-nowra">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-calendar3" aria-hidden="true" />
                    </span>

                    <input
                      type="month"
                      className="form-control"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      aria-label="Seleccionar mes y año"
                    />

                    <span className="input-group-text bg-white">
                      <i className="bi bi-calendar-event" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>

            </div>
            {/* fin derecha */}

          </div>
        </div>
      </section>

      {/* =======================
          CONTENIDO PRINCIPAL
         ======================= */}
      <section className="container py-4">
        <div className="row g-4">
          {/* ========== IZQUIERDA ========== */}
          <div className="col-12 col-lg-8">
            {/* Registrar gasto */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Registrar gasto</h5>
                  <span className="small text-success d-inline-flex align-items-center gap-2">
                    Listo <i className="bi bi-check2-circle" aria-hidden="true" />
                  </span>
                </div>

                <form onSubmit={handleSave} noValidate>
                  <div className="row g-3">
                    <div className="col-12 col-md-4">
                      <label className="form-label">Fecha</label>
                      <div className={`input-group ${errors.date ? "has-validation" : ""}`}>
                        <span className="input-group-text bg-white">
                          <i className="bi bi-calendar2-date" aria-hidden="true" />
                        </span>
                        <input
                          type="date"
                          className={`form-control ${errors.date ? "is-invalid" : ""}`}
                          value={form.date}
                          onChange={onChange("date")}
                        />
                        {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label">Categoría</label>
                      <div className={`input-group ${errors.category ? "has-validation" : ""}`}>
                        <span className="input-group-text bg-white">
                          <i className="bi bi-tags" aria-hidden="true" />
                        </span>
                        <select
                          className={`form-select ${errors.category ? "is-invalid" : ""}`}
                          value={form.category}
                          onChange={onChange("category")}
                        >
                          <option value="">Seleccione...</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <div className="invalid-feedback">{errors.category}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label">Valor</label>
                      <div className={`input-group ${errors.value ? "has-validation" : ""}`}>
                        <span className="input-group-text bg-white">
                          <i className="bi bi-cash-coin" aria-hidden="true" />
                        </span>
                        <input
                          type="number"
                          min="0"
                          className={`form-control ${errors.value ? "is-invalid" : ""}`}
                          value={form.value}
                          onChange={onChange("value")}
                          placeholder="Ej: 45000"
                        />
                        {errors.value && <div className="invalid-feedback">{errors.value}</div>}
                      </div>
                    </div>

                    <div className="col-12 col-md-8">
                      <label className="form-label">Descripción</label>
                      <div className={`input-group ${errors.description ? "has-validation" : ""}`}>
                        <span className="input-group-text bg-white">
                          <i className="bi bi-card-text" aria-hidden="true" />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${errors.description ? "is-invalid" : ""}`}
                          value={form.description}
                          onChange={onChange("description")}
                          placeholder="Detalle"
                        />
                        {errors.description && (
                          <div className="invalid-feedback">{errors.description}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label">Responsable</label>
                      <div className={`input-group ${errors.responsible ? "has-validation" : ""}`}>
                        <span className="input-group-text bg-white">
                          <i className="bi bi-person" aria-hidden="true" />
                        </span>
                        <select
                          className={`form-select ${errors.responsible ? "is-invalid" : ""}`}
                          value={form.responsible}
                          onChange={onChange("responsible")}
                        >
                          <option value="">Seleccione...</option>
                          {responsibles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        {errors.responsible && (
                          <div className="invalid-feedback">{errors.responsible}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-success px-4 fw-semibold"
                      disabled={!formValid || saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-save2 me-2" aria-hidden="true" />
                          Guardar
                        </>
                      )}
                    </button>

                    <span className="text-muted small">
                      Tip: el resumen y la tabla se filtran por el mes/año elegido.
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* Tabla */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Gastos del periodo</h5>
                  <span className="badge text-bg-light border">{month}</span>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Fecha</th>
                        <th>Categoría</th>
                        <th className="text-end">Valor</th>
                        <th>Descripción</th>
                        <th>Responsable</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {expensesInPeriod.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center text-muted py-4">
                            <i className="bi bi-inbox me-2" aria-hidden="true" />
                            Sin registros en el periodo
                          </td>
                        </tr>
                      ) : (
                        expensesInPeriod.map((e) => (
                          <tr key={e.id}>
                            <td>{e.date}</td>
                            <td>
                              <span className="badge text-bg-secondary-subtle text-secondary border">
                                {e.category}
                              </span>
                            </td>
                            <td className="text-end fw-semibold">{currency(e.value)}</td>
                            <td className="text-truncate" style={{ maxWidth: 260 }}>
                              {e.description}
                            </td>
                            <td>{e.responsible}</td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(e.id)}
                              >
                                <i className="bi bi-trash3 me-1" aria-hidden="true" />
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>

          {/* ========== DERECHA ========== */}
          <div className="col-12 col-lg-4">
            {/* Resumen */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Resumen</h6>
                  <span className="badge text-bg-light border">{month}</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Total general</span>
                  <span className="fw-semibold">{currency(totalGeneral)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Cuota por responsable</span>
                  <span className="fw-semibold">{currency(cuota)}</span>
                </div>

                <hr className="my-3" />

                <div className="fw-semibold mb-2">Totales / Saldos</div>

                <div className="d-grid gap-2">
                  {activeResponsibles.map((name) => {
                    const total = totalsByResponsible[name] || 0;
                    const saldo = cuota - total;

                    return (
                      <div key={name} className="border rounded-3 p-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-semibold">{name}</div>
                            <div className="small text-muted">
                              Total: {currency(total)} · Cuota: {currency(cuota)}
                            </div>
                          </div>

                          <div className="text-end">
                            <span
                              className={`badge ${badgeSaldo(saldo)} rounded-pill px-2 py-1`}
                            >
                              {saldo > 0 ? "A favor" : saldo < 0 ? "Debe" : "Al día"}
                            </span>
                            <div className="small fw-semibold mt-1">{currency(saldo)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="alert alert-success mt-3 mb-0 rounded-3 border-0">
                  <div className="small text-muted">Se ha gastado en el mes:</div>
                  <div className="fw-bold">{currency(totalGeneral)}</div>
                </div>
              </div>
            </div>

            {/* Resumen por categoría */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-1">Resumen por categoría</h6>
                <div className="small text-muted mb-3">
                  {totalsByCategory.length
                    ? "Totales por categoría en el periodo."
                    : "Sin gastos por categoría en el periodo."}
                </div>

                {totalsByCategory.length === 0 ? (
                  <div className="text-muted small">
                    <i className="bi bi-info-circle me-2" aria-hidden="true" />
                    Aún no hay registros para el mes seleccionado.
                  </div>
                ) : (
                  <div className="d-grid gap-2">
                    {totalsByCategory.map(([cat, val]) => {
                      const pct = totalGeneral ? Math.round((val / totalGeneral) * 100) : 0;

                      return (
                        <div key={cat} className="border rounded-3 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold">{cat}</span>
                            <span className="fw-semibold">{currency(val)}</span>
                          </div>

                          <div className="progress mt-2" style={{ height: 8 }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${pct}%` }}
                              aria-valuenow={pct}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>

                          <div className="small text-muted mt-1">{pct}% del total</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
