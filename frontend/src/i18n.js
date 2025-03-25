import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      "Bienvenido(a)": "Bienvenido(a)",
      "Aquí puedes gestionar todas las evaluaciones y configuraciones del sistema Mia": "Aquí puedes gestionar todas las evaluaciones y configuraciones del sistema Mia",
      "Empleados evaluados": "Empleados evaluados",
      "Visualiza los resultados por colaborador": "Visualiza los resultados por colaborador",
      "Estadísticas por categoría": "Estadísticas por categoría",
      "Explora los resultados por tipo de competencia": "Explora los resultados por tipo de competencia",
      "Puntaje promedio mensual": "Puntaje promedio mensual",
      "Consulta el rendimiento mensual por área o sucursal": "Consulta el rendimiento mensual por área o sucursal",
      "Niveles de desempeño": "Niveles de desempeño",
      "Configura y visualiza los niveles de evaluación": "Configura y visualiza los niveles de evaluación",
      "Ingresar": "Ingresar",
      "DNI o contraseña incorrectos": "DNI o contraseña incorrectos",
      "Tu evaluación mejora el futuro": "Tu evaluación mejora el futuro"
    }
  },
  en: {
    translation: {
      "Bienvenido(a)": "Welcome",
      "Aquí puedes gestionar todas las evaluaciones y configuraciones del sistema Mia": "Here you can manage all evaluations and system settings",
      "Empleados evaluados": "Evaluated employees",
      "Visualiza los resultados por colaborador": "View results by employee",
      "Estadísticas por categoría": "Category statistics",
      "Explora los resultados por tipo de competencia": "Explore results by competency type",
      "Puntaje promedio mensual": "Monthly average score",
      "Consulta el rendimiento mensual por área o sucursal": "View monthly performance by area or branch",
      "Niveles de desempeño": "Performance levels",
      "Configura y visualiza los niveles de evaluación": "Configure and view evaluation levels",
      "Ingresar": "Login",
      "DNI o contraseña incorrectos": "DNI or password incorrect",
      "Tu evaluación mejora el futuro": "Your evaluation shapes the future"
    }
  },
  pt: {
    translation: {
      "Bienvenido(a)": "Bem-vindo(a)",
      "Aquí puedes gestionar todas las evaluaciones y configuraciones del sistema Mia": "Aqui você pode gerenciar todas as avaliações e configurações do sistema Mia",
      "Empleados evaluados": "Funcionários avaliados",
      "Visualiza los resultados por colaborador": "Veja os resultados por colaborador",
      "Estadísticas por categoría": "Estatísticas por categoria",
      "Explora los resultados por tipo de competencia": "Explore os resultados por tipo de competência",
      "Puntaje promedio mensual": "Pontuação média mensal",
      "Consulta el rendimiento mensual por área o sucursal": "Veja o desempenho mensal por área ou filial",
      "Niveles de desempeño": "Níveis de desempenho",
      "Configura y visualiza los niveles de evaluación": "Configure e veja os níveis de avaliação",
      "Ingresar": "Entrar",
      "DNI o contraseña incorrectos": "DNI ou senha incorretos",
      "Tu evaluación mejora el futuro": "Sua avaliação molda o futuro"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false }
  });

export default i18n;
