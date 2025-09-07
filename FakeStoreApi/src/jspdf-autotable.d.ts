declare module "jspdf-autotable" {
  import jsPDF from "jspdf";
  export interface HeaderFooter {
    doc?: jsPDF;
    pageNumber?: number;
    settings?: {
      margin: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
      startY?: number;
    };
  }

  export interface UserOptions {
    head?: (string | number)[][];
    body?: (string | number)[][];
    foot?: (string | number)[][];
    startY?: number;
    theme?: "striped" | "grid" | "plain";
    headStyle?: Record<string, unknown>;
    bodyStyle?: Record<string, unknown>;
    footStyle?: Record<string, unknown>;
    style?: Record<string, unknown>;
    margin?:
      | number
      | { top?: number; bottom?: number; left?: number; right?: number };
    didDrawPage?: (data: HeaderFooter) => void;
  }
  export default function autoTable(doc: jsPDF, option: UserOptions): jsPDF;
}
