import React from 'react'
import { NavLink } from "react-router-dom";

export const Content = () => {
  return (
    <main>
      {/* Beneficios */}
      <section id="beneficios" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Todo lo que necesitas para tu día a día</h2>
            <p className="text-secondary mb-0">
              Simple, rápido y diseñado para tomar decisiones informadas.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: "bar-chart-line",
                title: "Reportes por mes",
                text:
                  "Visualiza tus gastos por categoría y mes. Exporta a PDF/CSV en un clic."
              },
              {
                icon: "wallet2",
                title: "Presupuestos y alertas",
                text:
                  "Configura límites por categoría y recibe alertas cuando te acerques al tope."
              },
              {
                icon: "tags",
                title: "Categorías personalizadas",
                text:
                  "Crea y edita tus categorías con iconos y colores para identificar rápido."
              },
              {
                icon: "cloud-check",
                title: "Sincronizado y seguro",
                text:
                  "Tus datos se guardan en la nube con autenticación y cifrado."
              },
              {
                icon: "phone",
                title: "Multiplataforma",
                text:
                  "Funciona en móvil y escritorio. PWA lista para usar sin conexión básica."
              },
              {
                icon: "pie-chart",
                title: "Análisis inteligente",
                text:
                  "Tendencias, promedios y recomendaciones para mejorar tus finanzas."
              }
            ].map((b, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary-subtle text-primary p-3 mb-3">
                      <i className={`bi bi-${b.icon} fs-3`}></i>
                    </div>
                    <h5 className="card-title fw-semibold">{b.title}</h5>
                    <p className="card-text text-secondary">{b.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 order-lg-2">
              <div className="ratio ratio-4x3 rounded-4 border overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop"
                  alt="Proceso de registro de gastos"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold">En 3 pasos sencillos</h2>
              <ol className="list-group list-group-numbered list-group-flush">
                <li className="list-group-item ps-0">
                  <span className="fw-semibold">Regístrate o inicia sesión</span>. Crea tu cuenta en segundos.
                </li>
                <li className="list-group-item ps-0">
                  <span className="fw-semibold">Registra tus gastos</span>. Monto, categoría, fecha y nota.
                </li>
                <li className="list-group-item ps-0">
                  <span className="fw-semibold">Analiza y decide</span>. Reportes mensuales y recomendaciones.
                </li>
              </ol>
              <div className="mt-3">
                <a href="#cta" className="btn btn-primary">
                  Empezar ahora
                </a>
                <span className="text-secondary ms-3">Sin tarjeta de crédito • Cancela cuando quieras</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capturas / Demo */}
      <section id="app" className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <h2 className="fw-bold">Una interfaz simple y clara</h2>
              <p className="text-secondary">
                Registra en segundos, filtra por categoría, y genera un reporte mensual con un clic.
              </p>
              <div className="ratio ratio-16x9 rounded-4 border overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200&auto=format&fit=crop"
                  alt="Dashboard de GastosDiarios"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="p-4 rounded-4 border bg-white shadow-sm h-100">
                <h5 className="fw-semibold mb-3">¿Qué puedes hacer?</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Registrar ingresos y gastos
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Presupuestos por categoría
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Reportes por mes y exportación
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Alertas cuando te acercas al límite
                  </li>
                </ul>
                <a href="#cta" className="btn btn-primary w-100">
                  Crear cuenta gratis
                </a>
                <small className="d-block text-center text-secondary mt-2">
                  Prueba completa por 14 días
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-5 bg-white border-top">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Planes simples</h2>
            <p className="text-secondary">Elige el plan que se ajuste a tu bolsillo.</p>
          </div>

          <div className="row g-4">
            {/* Gratis */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h6 className="text-secondary">Gratis</h6>
                  <h3 className="fw-bold my-2">$0 <small className="fs-6 text-secondary">/mes</small></h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Hasta 200 registros/mes</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>2 presupuestos activos</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Exportación CSV</li>
                  </ul>
                  <a className="btn btn-outline-primary w-100" href="#cta">Empezar</a>
                </div>
              </div>
            </div>

            {/* Pro */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-primary shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="text-primary">Pro</h6>
                    <span className="badge text-bg-primary">Popular</span>
                  </div>
                  <h3 className="fw-bold my-2">$4.99 <small className="fs-6 text-secondary">/mes</small></h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Registros ilimitados</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Presupuestos ilimitados</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Exportación PDF/CSV</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Reportes avanzados</li>
                  </ul>
                  <a className="btn btn-primary w-100" href="#cta">Probar Pro</a>
                </div>
              </div>
            </div>

            {/* Equipo */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h6 className="text-secondary">Equipo</h6>
                  <h3 className="fw-bold my-2">$14.99 <small className="fs-6 text-secondary">/mes</small></h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Hasta 5 usuarios</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Compartir categorías</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2 text-success"></i>Soporte prioritario</li>
                  </ul>
                  <a className="btn btn-outline-primary w-100" href="#cta">Contactar ventas</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Historias reales</h2>
            <p className="text-secondary">Esto dicen nuestros usuarios.</p>
          </div>

          <div className="row g-4">
            {[
              {
                name: "Laura",
                text:
                  "Ahora sé exactamente a dónde se va mi dinero. El reporte mensual es un golazo.",
                img: "https://i.pravatar.cc/80?img=5"
              },
              {
                name: "Andrés",
                text:
                  "Las alertas de presupuesto me han ayudado a no pasarme a fin de mes.",
                img: "https://i.pravatar.cc/80?img=6"
              },
              {
                name: "Camila",
                text:
                  "La exportación a PDF me sirve para compartir el control con mi pareja.",
                img: "https://i.pravatar.cc/80?img=7"
              }
            ].map((t, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src={t.img} alt={t.name} className="rounded-circle me-3 border" />
                      <div>
                        <h6 className="mb-0 fw-semibold">{t.name}</h6>
                        <small className="text-secondary">Usuario verificado</small>
                      </div>
                    </div>
                    <p className="mb-0 text-secondary">“{t.text}”</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
