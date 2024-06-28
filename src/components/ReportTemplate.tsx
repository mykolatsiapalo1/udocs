import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type ReportData = {
    projectType: string;
    projectName: string;
    customerName: string;
    projectColor: string;
    date: string;
    hoursRemaining: number;
    consultantName: string;
    firm: string;
    scope: string;
    activitiesList: string;
    shortTermNextSteps: string;
    legalDisclaimer: string;
};

const ReportTemplate: React.FC<ReportData> = ({
    projectType,
    projectName,
    customerName,
    projectColor,
    date,
    hoursRemaining,
    consultantName,
    firm,
    scope,
    activitiesList,
    shortTermNextSteps,
    legalDisclaimer,
}) => {
    const generatePdf = (): void => {
        const input = document.getElementById('pdf-content') as HTMLElement;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('ProjectStatusReport.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };

    return (
        <div style={{scale: "0.6"}}>
            <div id="pdf-content" style={{ padding: 20, height: "100dvh", border: '1px solid #ccc', display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
                <p>Project Status Report | {customerName} | {projectName} | {date}</p>
                <h1>{projectType} Status Report</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Project Name</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{projectName}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{customerName}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Project Status</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Date</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Hours Remaining</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Prepared By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '8px', backgroundColor: projectColor }}>{projectColor}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{date}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>{hoursRemaining}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}>
                                {consultantName}
                                <br />
                                {firm}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <strong>Scope:</strong>
                    <br />
                    {scope}
                </p>
                <h2>Activities Completed this Week:</h2>
                <p>{activitiesList}</p>
                <h2>Project Next Steps:</h2>
                <p>{shortTermNextSteps}</p>
                <p>
                    <strong>{firm}</strong>
                </p>
                <p>{legalDisclaimer}</p>
            </div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
};

export default ReportTemplate;
