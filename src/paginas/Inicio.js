import { Grafica } from "../utilidades";

export const Inicio = () => {
  const conductores = [{
    name: "Activos",
    count: 21
  }, {
    name: "Inactivos",
    count: 3
  }];

  const viajes = [{
    name: "Terminados",
    count: 328
  }, {
    name: "Pendientes",
    count: 4
  },
  {
    name: "Cancelados",
    count: 27
  }];

  const unidades = [{
    name: "Activas",
    count: 18
  }, {
    name: "Inactivas",
    count: 3
  },
  {
    name: "En Mantenimiento",
    count: 2
  },
  {
    name: "Otro datos",
    count: 18
  },
  {
    name: "Nuevo Dato",
    count: 37
  }];

  return (
    <>
      <div className="contenedor-extra contenido-principal">
        <div className="carta">
          <h3>Viajes</h3>
          <Grafica datos={viajes} clase={"viajes"} />
        </div>
        <div className="contenido-cartas">
          <div className="carta">
            <h3>Conductores</h3>
            <Grafica datos={conductores} clase={"conductores"} />
          </div>
          <div className="carta">
            <h3>Unidades</h3>
            <Grafica datos={unidades} clase={"unidades"} />
          </div>
        </div>
      </div>
    </>
  );
};
