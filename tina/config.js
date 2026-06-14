import { defineConfig } from "@tinacms/cli";

export default defineConfig({
  branch: "main",
  clientId: null, // Ostavi prazno za sada
  token: null, // Ostavi prazno za sada

  build: {
    outputFolder: "admin",
    publicFolder: "",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "projekti",
        label: "Projekti",
        path: "",
        files: [
          {
            label: "Lista projekata",
            name: "projekti",
            file: "projekti.json", // GDE ĆE SE SPREMATI TVOJ JSON
            fields: [
              {
                type: "object",
                label: "Projekti",
                name: "lista",
                list: true,
                fields: [
                  { type: "string", label: "Naziv", name: "title" },
                  { type: "string", label: "Opis", name: "opis" },
                  { type: "string", label: "Boja", name: "boja" },
                  { type: "string", label: "Putanja", name: "folder_path" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
