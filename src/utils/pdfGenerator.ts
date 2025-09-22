// import { jsPDF } from "jspdf";
// import { Therapy } from "./therapies";

// interface UserProfile {
//   age: number;
//   gender: string;
//   goal: string;
// }

// interface WearableSummary {
//   steps: number;
//   calories_burned: number;
//   sleep_duration: number;
//   resting_heart_rate: number;
//   hrv: number;
//   stress_level: number;
//   water_intake: number;
//   calories_consumed: number;
// }

// interface PDFData {
//   profile: UserProfile;
//   wearable: WearableSummary;
//   aiRecommendations: string[];
//   selectedTherapies: Therapy[];
// }

// export const generateBiohackPDF = (data: PDFData) => {
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   doc.text("My Biohack Plan", 105, 20, { align: "center" });

//   // User Profile
//   doc.setFontSize(12);
//   doc.text("User Profile:", 20, 40);
//   doc.text(`Age: ${data.profile.age}`, 30, 50);
//   doc.text(`Gender: ${data.profile.gender}`, 30, 57);
//   doc.text(`Goal: ${data.profile.goal}`, 30, 64);

//   // Wearable Summary
//   doc.text("Wearable Insights (Last 7 days):", 20, 80);
//   const w = data.wearable;
//   doc.text(`Steps: ${w.steps}`, 30, 90);
//   doc.text(`Calories Burned: ${w.calories_burned}`, 30, 97);
//   doc.text(`Sleep: ${w.sleep_duration} hrs`, 30, 104);
//   doc.text(`Resting HR: ${w.resting_heart_rate}`, 30, 111);
//   doc.text(`HRV: ${w.hrv}`, 30, 118);
//   doc.text(`Stress Level: ${w.stress_level}`, 30, 125);
//   doc.text(`Water Intake: ${w.water_intake} L`, 30, 132);
//   doc.text(`Calories Consumed: ${w.calories_consumed}`, 30, 139);

//   // AI Recommendations
//   doc.text("AI Recommendations:", 20, 155);
//   data.aiRecommendations.forEach((rec, i) => {
//     doc.text(`- ${rec}`, 30, 165 + i * 7);
//   });

//   // Selected Therapies
//   doc.text("Therapies to Explore:", 20, 200);
//   data.selectedTherapies.forEach((t, i) => {
//     doc.text(`- ${t.name}: ${t.description}`, 30, 210 + i * 10);
//   });

//   // Save PDF
//   doc.save("My_Biohack_Plan.pdf");
// };



import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function downloadPDF(data: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size

  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;

  page.drawText("My Biohack Plan", { x: 50, y, size: 24, font, color: rgb(0, 0.5, 0.5) });
  y -= 40;

  // Profile Info
  page.drawText(`Age: ${data.profile.age}`, { x: 50, y, size: 12, font });
  y -= 20;
  page.drawText(`Gender: ${data.profile.gender}`, { x: 50, y, size: 12, font });
  y -= 20;
  page.drawText(`Goal: ${data.profile.goal}`, { x: 50, y, size: 12, font });
  y -= 30;

  // AI Recommendations
  page.drawText("AI Recommendations:", { x: 50, y, size: 14, font, color: rgb(0, 0, 0) });
  y -= 20;

  data.aiRecommendations.forEach((rec: string) => {
    page.drawText(`• ${rec}`, { x: 60, y, size: 12, font });
    y -= 18;
  });
  y -= 20;

  // Selected Therapies
  page.drawText("Selected Therapies:", { x: 50, y, size: 14, font, color: rgb(0, 0, 0) });
  y -= 20;

  const wrapText = (text: string, maxWidth: number, fontSize: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    words.forEach((word) => {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth) {
        if (line) lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line);
    return lines;
  };

  data.selectedTherapies.forEach((therapy: any) => {
    const nameLines = wrapText(therapy.name, 500, 12);
    nameLines.forEach((line, idx) => {
      page.drawText(idx === 0 ? line : `  ${line}`, { x: 50, y, size: 12, font });
      y -= 15;
    });

    const descLines = wrapText(therapy.description, 500, 10);
    descLines.forEach((line) => {
      page.drawText(line, { x: 60, y, size: 10, font });
      y -= 12;
    });
    y -= 15;
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();

  // Convert to proper ArrayBuffer to avoid SharedArrayBuffer issue
  const buffer = pdfBytes.slice(0); // copy to normal Uint8Array backed by ArrayBuffer
  const blob = new Blob([buffer], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "biohack-plan.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
