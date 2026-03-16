import jsPDF from 'jspdf';
import { CalculationEntry } from '@/hooks/useCalculationHistory';

export const exportSingleCalculation = (entry: CalculationEntry) => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  doc.setFontSize(20);
  doc.text('WineCalc Report', margin, y);
  y += 12;

  doc.setFontSize(14);
  doc.text(entry.calculatorName, margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(new Date(entry.timestamp).toLocaleString(), margin, y);
  y += 12;

  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.text('Inputs:', margin, y);
  y += 7;

  Object.entries(entry.inputs).forEach(([key, value]) => {
    doc.text(`  ${key}: ${value}`, margin, y);
    y += 6;
  });

  y += 4;
  doc.setFontSize(13);
  doc.text(`Result: ${entry.result.toFixed(2)} ${entry.unit}`, margin, y);
  y += 8;

  if (entry.details) {
    doc.setFontSize(10);
    doc.setTextColor(80);
    const lines = doc.splitTextToSize(entry.details, 170);
    doc.text(lines, margin, y);
  }

  doc.save(`winecalc-${entry.calculatorId}-${Date.now()}.pdf`);
};

export const exportHistoryPdf = (history: CalculationEntry[]) => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  doc.setFontSize(20);
  doc.text('WineCalc — Calculation History', margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Exported: ${new Date().toLocaleString()}`, margin, y);
  y += 10;
  doc.setTextColor(0);

  history.forEach((entry, index) => {
    if (y > 260) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(12);
    doc.text(`${index + 1}. ${entry.calculatorName}`, margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(new Date(entry.timestamp).toLocaleString(), margin + 4, y);
    y += 5;

    doc.setTextColor(0);
    doc.setFontSize(10);
    const inputStr = Object.entries(entry.inputs)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    doc.text(`  ${inputStr}`, margin, y);
    y += 5;

    doc.text(`  Result: ${entry.result.toFixed(2)} ${entry.unit}`, margin, y);
    y += 4;

    if (entry.details) {
      doc.setFontSize(9);
      doc.setTextColor(80);
      const lines = doc.splitTextToSize(`  ${entry.details}`, 165);
      doc.text(lines, margin, y);
      y += lines.length * 4;
    }

    doc.setTextColor(0);
    y += 6;
  });

  doc.save(`winecalc-history-${Date.now()}.pdf`);
};
