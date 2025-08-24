import { Tour } from "nextstepjs";


const bookstepsEnglish: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Welcome",
        content: "This is small introduction of this tool to understand how you can use it",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title:  'Book name',
        content: 'This is your book name, you can edit it by clicking over it',
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Sidebar Toggler",
        content: "This is the sidebar toggler, you can open and close book sidebar by clicking over it",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Create chapter",
        content: "This is the create a new chapter button",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsSpanish: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Bienvenido",
        content: "¡Comencemos con NextStep!",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Nombre del libro",
        content: "Este es el nombre de tu libro, puedes editarlo haciendo clic sobre él",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Alternador de barra lateral",
        content: "Este es el alternador de la barra lateral, puedes abrir y cerrar la barra lateral del libro haciendo clic sobre él",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Crear capítulo",
        content: "Este es el botón para crear un nuevo capítulo",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsGerman: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Willkommen",
        content: "Lass uns mit NextStep beginnen!",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Buchtitel",
        content: "Dies ist dein Buchtitel, du kannst ihn bearbeiten, indem du darauf klickst",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Seitenleisten-Umschalter",
        content: "Dies ist der Umschalter für die Seitenleiste. Du kannst sie öffnen und schließen, indem du darauf klickst",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Kapitel erstellen",
        content: "Dies ist die Schaltfläche zum Erstellen eines neuen Kapitels",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsFrench: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Bienvenue",
        content: "Commençons avec NextStep !",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Nom du livre",
        content: "Ceci est le nom de ton livre, tu peux le modifier en cliquant dessus",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Bascule de la barre latérale",
        content: "Ceci est le bouton pour afficher ou masquer la barre latérale du livre",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Créer un chapitre",
        content: "Ceci est le bouton pour créer un nouveau chapitre",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

export { bookstepsEnglish, bookstepsFrench, bookstepsGerman, bookstepsSpanish };
