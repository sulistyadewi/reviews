import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable, { type HeaderFooter } from "jspdf-autotable";
// import HeaderFooter from "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";

interface Order {
  id: string;
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  customer: {
    name: string;
    address: string;
  };
  date: string;
  total: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
  }, []);

  const toBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpg"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const toBase64Watermark = (url: string, alpha = 0.1): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return new Error("Canvas 2d Context not available");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpg"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePdf = async (order: Order) => {
    try {
      const doc = new jsPDF();
      const logoPdf = "/logo.jpg";
      let base64: string | null = null;
      let base64Watermark: string | null = null;

      try {
        [base64, base64Watermark] = await Promise.all([
          toBase64(logoPdf),
          toBase64Watermark(logoPdf, 0.15),
        ]);
      } catch (err) {
        console.log(err);
      }

      if (base64Watermark) {
        const pageHeight = doc.internal.pageSize.getHeight();
        const pagewidth = doc.internal.pageSize.getWidth();
        const imgHeight = 100;
        const imgWidth = 100;
        const xPosition = (pagewidth - imgWidth) / 2;
        const yposition = (pageHeight - imgHeight) / 2;
        doc.addImage(
          base64Watermark,
          "JPG",
          xPosition,
          yposition,
          imgWidth,
          imgHeight
        );
      }

      const addHeaderFooter = (data: HeaderFooter) => {
        doc.setFontSize(20);
        if (base64) {
          try {
            doc.addImage(base64, "JPG", 10, 10, 20, 20);
          } catch (err) {
            console.log(err);
          }
        }
        doc.text("Sulis Mart", doc.internal.pageSize.getWidth() / 2, 23, {
          align: "center",
        });

        doc.line(5, 32, 200, 32);
        doc.line(5, 33, 200, 33);

        let pagesCount = doc.getNumberOfPages();
        doc.setFontSize(6);
        doc.text(
          `Page ${data.pageNumber} of ${pagesCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 15,
          { align: "center" }
        );
      };
      doc.setFontSize(14);
      doc.text("Order Invoice", doc.internal.pageSize.getWidth() / 2, 45, {
        align: "center",
      });

      doc.setFontSize(12);
      doc.text(`Order ID : ${order.id}`, 20, 60);
      doc.text(`Date : ${order.date}`, 120, 60);
      doc.text(`To :`, 20, 70);
      doc.text(`Customer : ${order.customer.name}`, 25, 75);
      doc.text(`Address   : ${order.customer.address}`, 25, 80);
      autoTable(doc, {
        startY: 90,
        head: [["Title Product", "Quantity", "Price ($)", "Subtotal ($)"]],
        body: order.item.map((ite) => [
          ite.title,
          ite.quantity,
          ite.price,
          ite.price * ite.quantity,
        ]),
        theme: "striped",
        headStyle: { fillcolor: [41, 128, 45] },
        didDrawPage: addHeaderFooter,
      });

      // let finalY = (doc as any).lastAutoTable.finalY || 110;
      doc.setFontSize(14);
      doc.text(`Total Paymemt : $${order.total.toFixed(2)}`, 20, 150);
      doc.save(`order-${order.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  if (!orders.length) {
    return <p>No orders found</p>;
  }
  return (
    <div className="h-screen ">
      <h1>My Orders</h1>
      <div className="px-3">
        {orders.map((order) => (
          // <div className="bg-white px-3 border mt-5">
          //   <div>
          //     <h2>ID : {order.id}</h2>
          //     <h2>Nama : {order.customer.name}</h2>
          //     <h2>Alamat : {order.customer.address}</h2>
          //   </div>
          //   <div className="mt-3">
          //     {order.item.map((e) => (
          //       <div>
          //         <div className="flex justify-between">
          //           <div>
          //             <h3>
          //               {e.title}{" "}
          //               <span className="text-slate-400">x {e.quantity}</span>
          //             </h3>
          //             <h3 className="text-slate-400">${e.price}</h3>
          //           </div>
          //           <h3>${(e.price * e.quantity).toFixed(2)}</h3>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          //   <div className="border-1 border-gray-300"></div>
          //   <div className="flex justify-between mt-2">
          //     <h2>Total : </h2>
          //     <h2>{order.total.toFixed(2)}</h2>
          //   </div>

          //   <p className="mt-2">{new Date(order.date).toLocaleString()}</p>
          // </div>
          <div className="bg-white px-3 py-3 mt-5 rounded-md dark:bg-gray-700">
            <div>
              <div className="flex gap-10">
                <h2>ID : {order.id}</h2>
                <h3 className="text-slate-500 dark:text-slate-400">
                  {new Date(order.date).toLocaleString()}
                </h3>
              </div>
              <div className="flex gap-5 mt-5">
                <h3 className="bg-blue-400 px-3 py-1 rounded-xl">
                  Nama : {order.customer.name}
                </h3>
                <h3 className="bg-blue-400 px-3 py-1 rounded-xl">
                  Alamat : {order.customer.address}
                </h3>
              </div>
            </div>
            <div className="mt-5">
              {order.item.map((e) => (
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h4>
                        {e.title}{" "}
                        <span className="text-slate-500 dark:text-slate-400">
                          {" "}
                          x {e.quantity}
                        </span>
                      </h4>
                      <h5 className="mx-5 text-slate-500 dark:text-slate-400">
                        ${e.price}
                      </h5>
                    </div>
                    <div>
                      <h4> {(e.quantity * e.price).toFixed(2)}</h4>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-5 font-semibold text-lg">
                <h2>Total : </h2>
                <h2>{order.total.toFixed(2)}</h2>
              </div>
              <button
                onClick={() => generatePdf(order)}
                className="bg-blue-500 px-2 py-1 rounded-md flex self-center gap-2 text-white cursor-pointer"
              >
                Generate <GrDocumentPdf className="text-lg flex self-center" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
