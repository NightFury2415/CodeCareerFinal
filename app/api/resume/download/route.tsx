import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    // Generate HTML for PDF conversion
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume - ${resumeData.personalInfo?.firstName} ${resumeData.personalInfo?.lastName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .contact { font-size: 14px; color: #666; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
            .experience-item, .education-item, .project-item { margin-bottom: 15px; }
            .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
            .item-title { font-weight: bold; font-size: 16px; }
            .item-company { color: #666; font-style: italic; }
            .item-date { color: #666; font-size: 14px; }
            .item-description { margin-top: 8px; }
            .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
            .skill-category { margin-bottom: 10px; }
            .skill-category-title { font-weight: bold; margin-bottom: 5px; }
            .skills-list { color: #666; }
            ul { padding-left: 20px; }
            li { margin-bottom: 3px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${resumeData.personalInfo?.firstName || ""} ${resumeData.personalInfo?.lastName || ""}</div>
            <div class="contact">
              ${resumeData.personalInfo?.email || ""} | ${resumeData.personalInfo?.phone || ""} | ${resumeData.personalInfo?.location || ""}
              ${resumeData.personalInfo?.linkedin ? `| LinkedIn: ${resumeData.personalInfo.linkedin}` : ""}
              ${resumeData.personalInfo?.github ? `| GitHub: ${resumeData.personalInfo.github}` : ""}
            </div>
          </div>

          ${
            resumeData.personalInfo?.summary
              ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <p>${resumeData.personalInfo.summary}</p>
            </div>
          `
              : ""
          }

          ${
            resumeData.experience?.length
              ? `
            <div class="section">
              <div class="section-title">Experience</div>
              ${resumeData.experience
                .map(
                  (exp: any) => `
                <div class="experience-item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${exp.position || ""}</div>
                      <div class="item-company">${exp.company || ""}</div>
                    </div>
                    <div class="item-date">${exp.startDate || ""} - ${exp.endDate || "Present"}</div>
                  </div>
                  ${exp.description ? `<div class="item-description">${exp.description}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            resumeData.education?.length
              ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${resumeData.education
                .map(
                  (edu: any) => `
                <div class="education-item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${edu.degree || ""}</div>
                      <div class="item-company">${edu.school || ""}</div>
                    </div>
                    <div class="item-date">${edu.graduationDate || ""}</div>
                  </div>
                  ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            resumeData.skills?.length
              ? `
            <div class="section">
              <div class="section-title">Skills</div>
              <div class="skills-grid">
                ${resumeData.skills
                  .map(
                    (skillGroup: any) => `
                  <div class="skill-category">
                    <div class="skill-category-title">${skillGroup.category || ""}</div>
                    <div class="skills-list">${skillGroup.skills || ""}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          ${
            resumeData.projects?.length
              ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${resumeData.projects
                .map(
                  (project: any) => `
                <div class="project-item">
                  <div class="item-header">
                    <div class="item-title">${project.name || ""}</div>
                    <div class="item-date">${project.date || ""}</div>
                  </div>
                  ${project.description ? `<div class="item-description">${project.description}</div>` : ""}
                  ${project.technologies ? `<div class="item-description"><strong>Technologies:</strong> ${project.technologies}</div>` : ""}
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

    // In a real implementation, you would use a library like Puppeteer to convert HTML to PDF
    // For now, we'll return the HTML content with proper headers for download
    const fileName = `resume-${resumeData.personalInfo?.firstName || "user"}-${resumeData.personalInfo?.lastName || "resume"}.pdf`

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error("Error generating resume PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
