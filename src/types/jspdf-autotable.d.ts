
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (
      options: {
        head: string[][];
        body: (string | number)[][];
        [key: string]: string | number | boolean | object; // You can add more specific properties here if needed
      }
    ) => jsPDF;
  }
}
