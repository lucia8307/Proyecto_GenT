import React from 'react';

const MaterialCard = ({ material }) => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{material?.materialName || "Nombre no disponible"}</h5>
        <p className="card-text">{material?.description || "Descripción no disponible"}</p>
        <p className="card-text"><strong>Categoría:</strong> {material.category}</p>

        {material.type === "Imagen" || material.type === "Fisico" ? (
          <>
            <img src={material.fileURL} alt={material.materialName} style={{ width: '100%' }} />
            <a href={material.fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
              Ver Imagen
            </a>
          </>
          ) : material.type === "PDF" ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f2f2f2' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF icon" style={{ width: '50px', marginRight: '10px' }} />
                <div>
                  <p className="mb-0"><strong>{material.materialName}</strong></p>
                  <p className="mb-0 text-muted">PDF</p>
                </div>
                <a href={material.fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary ml-auto">
                  Ver PDF
                </a>
              </div>
            </>
          ) : null}

        <p className="card-text">
          <small className="text-muted">Tipo: {material?.type || "Desconocido"}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Medio de Contacto: {material?.contacto || "Desconocido"}</small>
        </p>

        {material?.createdAt && (
          <p className="card-text">
            <small className="text-muted">Subido el: {new Date(material.createdAt.seconds * 1000).toLocaleDateString()}</small>
          </p>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
