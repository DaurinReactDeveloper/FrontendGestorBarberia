import React from "react";

export function AccordionItem({ id, title, icon: Icon, children }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="false"
          aria-controls={id}
        >
          <Icon /> {title}
        </button>
      </h2>
      <div
        id={id}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}

export function ContentSwitcher({
  opcionSeleccionada,
  opciones,
  defaultContent,
}) {
  return (
    <>
      {opciones.map(
        ({ key, content }) =>
          opcionSeleccionada === key && <div key={key}>{content}</div>
      )}
      {opcionSeleccionada === null && defaultContent}
    </>
  );
}
