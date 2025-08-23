import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    // Generate HTML content for PDF
    const htmlContent = generateResumeHTML(resumeData)

    // In a real implementation, you would use a library like Puppeteer or jsPDF
    // For now, we'll simulate PDF generation
    const pdfBuffer = await generatePDF(htmlContent)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resumeData.personal.firstName || "Resume"}_${resumeData.personal.lastName || "CV"}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateResumeHTML(resumeData: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Resume - ${resumeData.personal.firstName} ${resumeData.personal.lastName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 28px;
          margin: 0 0 10px 0;
          font-weight: bold;
        }
        .contact-info {
          font-size: 14px;
          margin: 10px 0;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }
        .experience-item, .education-item, .project-item {
          margin-bottom: 20px;
        }
        .experience-header, .education-header, .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 5px;
        }
        .job-title, .degree, .project-name {
          font-weight: bold;
          font-size: 16px;
        }
        .company, .school {
          font-size: 14px;
          color: #666;
        }
        .date {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        .description {
          margin-top: 10px;
          white-space: pre-line;
        }
        .skills {
          line-height: 1.8;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${resumeData.personal.firstName || "Your Name"} ${resumeData.personal.lastName || ""}</h1>
        <div class="contact-info">
          ${resumeData.personal.email ? resumeData.personal.email : ""} 
          ${resumeData.personal.phone ? " • " + resumeData.personal.phone : ""}
          ${resumeData.personal.location ? " • " + resumeData.personal.location : ""}
        </div>
        ${
          resumeData.personal.linkedin || resumeData.personal.github
            ? `
          <div class="contact-info">
            ${resumeData.personal.linkedin ? resumeData.personal.linkedin : ""}
            ${resumeData.personal.github ? (resumeData.personal.linkedin ? " • " : "") + resumeData.personal.github : ""}
          </div>
        `
            : ""
        }
      </div>

      ${
        resumeData.personal.summary
          ? `
        <div class="section">
          <h2>Professional Summary</h2>
          <p>${resumeData.personal.summary}</p>
        </div>
      `
          : ""
      }

      ${
        resumeData.experience.length > 0
          ? `
        <div class="section">
          <h2>Professional Experience</h2>
          ${resumeData.experience
            .map(
              (exp: any) => `
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <div class="job-title">${exp.title || "Job Title"}</div>
                  <div class="company">${exp.company || "Company Name"}${exp.location ? " • " + exp.location : ""}</div>
                </div>
                <div class="date">${exp.startDate || "Start"} - ${exp.current ? "Present" : exp.endDate || "End"}</div>
              </div>
              ${exp.description ? `<div class="description">${exp.description}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.education.length > 0
          ? `
        <div class="section">
          <h2>Education</h2>
          ${resumeData.education
            .map(
              (edu: any) => `
            <div class="education-item">
              <div class="education-header">
                <div>
                  <div class="degree">${edu.degree || "Degree"}</div>
                  <div class="school">${edu.school || "School Name"}${edu.location ? " • " + edu.location : ""}</div>
                </div>
                <div class="date">
                  ${edu.graduationYear || "Year"}
                  ${edu.gpa ? "<br>GPA: " + edu.gpa : ""}
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.skills.length > 0
          ? `
        <div class="section">
          <h2>Skills</h2>
          <div class="skills">${resumeData.skills.join(" • ")}</div>
        </div>
      `
          : ""
      }

      ${
        resumeData.projects.length > 0
          ? `
        <div class="section">
          <h2>Projects</h2>
          ${resumeData.projects
            .map(
              (project: any) => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-name">${project.name || "Project Name"}</div>
                ${project.url ? `<a href="${project.url}" target="_blank">View Project</a>` : ""}
              </div>
              ${project.description ? `<div class="description">${project.description}</div>` : ""}
              ${project.technologies ? `<div style="margin-top: 5px;"><strong>Technologies:</strong> ${project.technologies}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : ""
      }
    </body>
    </html>
  `
}

async function generatePDF(htmlContent: string): Promise<Buffer> {
  // This is a mock implementation
  // In a real app, you would use Puppeteer, jsPDF, or similar

  // For demonstration, we'll create a simple text-based "PDF"
  const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(Resume Generated Successfully!) Tj
0 -20 Td
(This is a mock PDF. In production, use Puppeteer or jsPDF.) Tj
0 -20 Td
(Your resume data has been processed.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`

  return Buffer.from(mockPdfContent, "utf-8")
}
