import { NextResponse } from "next/server"
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

interface Experience {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  description: string
}

interface ResumeData {
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
    website?: string
    summary?: string
  }
  experience?: Experience[]
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // support multiple incoming shapes:
    // 1) { resumeData: { personal: {...}, ... }, html }
    // 2) { personal: {...}, ... }  (bare resume object)
    // 3) { firstName: 'x', lastName: 'y' } (personal object)
    let resumeData: any = null
    let html: string | undefined = undefined

    if (body == null) {
      resumeData = {}
    } else if (body.resumeData !== undefined) {
      resumeData = body.resumeData
      html = body.html
    } else {
      // body itself may be the resume object or the personal object
      resumeData = body
      html = (body && typeof body.html === 'string') ? body.html : undefined
    }

    // normalize incoming shape: some callers use `personal`, others `personalInfo` or send the personal object directly
    let personal: any = resumeData?.personal || resumeData?.personalInfo || (typeof resumeData?.firstName === 'string' || typeof resumeData?.lastName === 'string' ? resumeData : {})

    // Log minimal info to help debugging in dev (safe for logs)
    console.log("/api/resume/download received", {
      hasResumeData: !!resumeData,
      personalKeys: Array.isArray(Object.keys(personal)) ? Object.keys(personal) : [],
      hasHtml: !!html,
    })

    // If names are missing, use safe fallbacks so PDF can still be generated.
    if (!personal?.firstName || !personal?.lastName) {
      personal.firstName = personal.firstName || "First"
      personal.lastName = personal.lastName || "Last"

      // persist names back onto resumeData so filename and content use them
      if (resumeData) {
        if (!resumeData.personal && resumeData.personalInfo) {
          resumeData.personalInfo.firstName = personal.firstName
          resumeData.personalInfo.lastName = personal.lastName
        } else if (!resumeData.personal) {
          resumeData.personal = { ...(resumeData.personalInfo || {}), firstName: personal.firstName, lastName: personal.lastName }
        } else {
          resumeData.personal.firstName = personal.firstName
          resumeData.personal.lastName = personal.lastName
        }
      }
    }

    // if client didn't send an html string, we'll generate one server-side from resumeData
    const htmlToUse = html || undefined

    // Create a new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    })

    // Ensure resumeData.personal exists for subsequent usage
    resumeData.personal = resumeData.personal || resumeData.personalInfo || personal || { firstName: 'First', lastName: 'Last' }

    // Set document properties
    doc.setProperties({
      title: `${resumeData.personal.firstName} ${resumeData.personal.lastName} - Resume`,
      author: resumeData.personal.firstName + ' ' + resumeData.personal.lastName,
      subject: 'Resume',
      keywords: 'resume, cv',
      creator: 'CodeCareer'
    })

    // Set base font
    doc.setFont('helvetica')

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 40
    let y = 50

    // Header: centered name and compact contact row (Times font for a professional serif look)
    doc.setFont('times', 'bold')
    doc.setFontSize(22)
    const fullName = `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.toUpperCase()
    doc.text(fullName, pageWidth / 2, y, { align: 'center' })

    // compact contact row beneath name (icons + short labels)
    y += 22
    doc.setFont('times', 'normal')
    doc.setFontSize(9)
    const contactElements: string[] = []
    if (resumeData.personal.location) contactElements.push(`${String.fromCharCode(0x2706)} ${resumeData.personal.location}`) // phone symbol placeholder
    if (resumeData.personal.phone) contactElements.push(`${String.fromCharCode(0x260E)} ${resumeData.personal.phone}`)
    if (resumeData.personal.email) contactElements.push(`${String.fromCharCode(0x2709)} ${resumeData.personal.email}`)

    // join with middot and print centered
    const contactLine = contactElements.join('   ·   ')
    doc.text(contactLine, pageWidth / 2, y, { align: 'center' })

    // small links row (LinkedIn / GitHub) shown as short labels
    y += 12
    const linkLabels: { label: string; url: string }[] = []
    if (resumeData.personal.linkedin) linkLabels.push({ label: 'LinkedIn', url: resumeData.personal.linkedin })
    if (resumeData.personal.github) linkLabels.push({ label: 'GitHub', url: resumeData.personal.github })
    if (linkLabels.length) {
      doc.setFontSize(9)
      const labelsText = linkLabels.map(l => l.label).join('   ·   ')
      doc.text(labelsText, pageWidth / 2, y, { align: 'center' })
      // add individual links roughly positioned (split widths)
      let currentX = (pageWidth - doc.getTextWidth(labelsText)) / 2
      linkLabels.forEach((l, idx) => {
        const lbl = l.label
        const w = doc.getTextWidth(lbl)
        doc.link(currentX, y - 8, w, 12, { url: l.url.startsWith('http') ? l.url : `https://${l.url}` })
        currentX += w
        // account for middot spacing
        currentX += doc.getTextWidth('   ·   ')
      })
    }

    // divider line
    y += 18
    doc.setDrawColor(150)
    doc.setLineWidth(0.8)
    doc.line(margin, y, pageWidth - margin, y)
    y += 14

    // Professional Summary
    if (resumeData.personal.summary) {
      doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
      doc.text('Professional Summary', margin, y)
      y += 16
      doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
      const summaryLines = doc.splitTextToSize(resumeData.personal.summary, pageWidth - margin * 2)
      doc.text(summaryLines, margin, y)
      y += summaryLines.length * 14 + 12
    }

    // Experience
    if (resumeData.experience?.length) {
      doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
      doc.text('Experience', margin, y)
      y += 16

      resumeData.experience.forEach((exp: Experience) => {
        // page break simple handling
        if (y > pageHeight - margin - 100) {
          doc.addPage()
          y = margin
        }

        doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
        doc.text(exp.title || '', margin, y)
        // date right-aligned
        const dateText = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`
        doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
        doc.text(dateText, pageWidth - margin, y, { align: 'right' })
        y += 14

        doc.setFontSize(10)
  doc.setFont('helvetica', 'italic')
        doc.text(`${exp.company || ''}${exp.location ? ' • ' + exp.location : ''}`, margin, y)
        y += 14

        // description
  doc.setFont('helvetica', 'normal')
        const descLines = doc.splitTextToSize(exp.description || '', pageWidth - margin * 2)
        doc.text(descLines, margin, y)
        y += descLines.length * 12 + 12
      })
    }

    // Education
    if (resumeData.education?.length) {
      if (y > pageHeight - margin - 100) { doc.addPage(); y = margin }
      doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
      doc.text('Education', margin, y)
      y += 16
      resumeData.education.forEach((edu: any) => {
        doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
        doc.text(edu.degree || '', margin, y)
        doc.setFontSize(10)
        doc.text(edu.graduationYear || '', pageWidth - margin, y, { align: 'right' })
        y += 14
  doc.setFont('helvetica', 'normal')
        doc.text(`${edu.school || ''}${edu.location ? ' • ' + edu.location : ''}`, margin, y)
        y += 16
      })
    }

    // Skills
    if (resumeData.skills) {
      if (y > pageHeight - margin - 100) { doc.addPage(); y = margin }
      doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
      doc.text('Skills', margin, y)
      y += 16
      doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
      const tech = Array.isArray(resumeData.skills.technical) ? resumeData.skills.technical.join(', ') : (resumeData.skills.technical || '')
      const soft = Array.isArray(resumeData.skills.soft) ? resumeData.skills.soft.join(', ') : (resumeData.skills.soft || '')
      if (tech) {
        doc.text('Technical: ' + tech, margin, y)
        y += 14
      }
      if (soft) {
        doc.text('Soft: ' + soft, margin, y)
        y += 14
      }
      y += 6
    }

    // Projects
    if (resumeData.projects?.length) {
      if (y > pageHeight - margin - 100) { doc.addPage(); y = margin }
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
      doc.text('Projects', margin, y)
      y += 16
      resumeData.projects.forEach((p: any) => {
        doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
        doc.text(p.name || '', margin, y)
        if (p.url) {
          const label = 'Link'
          const x = pageWidth - margin
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.text(label, x, y, { align: 'right' })
          const w = doc.getTextWidth(label)
          doc.link(x - w, y - 10, w, 12, { url: p.url.startsWith('http') ? p.url : `https://${p.url}` })
        }
        y += 14
  doc.setFont('helvetica', 'normal')
        const projLines = doc.splitTextToSize(p.description || '', pageWidth - margin * 2)
        doc.text(projLines, margin, y)
        y += projLines.length * 12 + 10
      })
    }

    // Generate PDF Buffer
    const pdfBuffer = doc.output('arraybuffer')

    // Return the PDF with proper headers
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${(personal.firstName || 'first')}_${(personal.lastName || 'last')}_resume.pdf"`.toLowerCase().replace(/\s+/g, '_'),
      },
    })
    // NOTE: previous code returned HTML for a fallback path. Keep legacy HTML builder
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume - ${resumeData.personalInfo?.firstName} ${resumeData.personalInfo?.lastName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            :root {
              --background: oklch(1 0 0);
              --foreground: oklch(0.145 0 0);
              --primary: oklch(0.205 0 0);
              --primary-foreground: oklch(0.985 0 0);
              --muted: oklch(0.97 0 0);
              --muted-foreground: oklch(0.556 0 0);
              --border: oklch(0.922 0 0);
            }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: var(--foreground);
              max-width: 8.5in;
              margin: 0 auto;
              padding: 0.75in;
              background-color: var(--background);
            }
            .header {
              text-align: left;
              margin-bottom: 2rem;
              border-bottom: 2px solid var(--primary);
              padding-bottom: 1rem;
            }
            .name {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
              color: #1a1a1a;
            }
            .contact {
              font-size: 0.875rem;
              color: #4b5563;
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
            }
            .contact a {
              color: #2563eb;
              text-decoration: none;
            }
            .section {
              margin-bottom: 2rem;
            }
            .section-title {
              font-size: 1.25rem;
              font-weight: 600;
              color: #2563eb;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
            }
            .experience-item, .education-item, .project-item {
              margin-bottom: 1.5rem;
              page-break-inside: avoid;
            }
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 0.5rem;
            }
            .item-title {
              font-weight: 600;
              font-size: 1rem;
              color: #1a1a1a;
            }
            .item-company {
              color: #4b5563;
              font-weight: 500;
            }
            .item-date {
              color: #6b7280;
              font-size: 0.875rem;
            }
            .item-description {
              margin-top: 0.5rem;
              color: #4b5563;
              white-space: pre-line;
            }
            .skills-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
            .skill-category {
              margin-bottom: 1rem;
            }
            .skill-category-title {
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: #1a1a1a;
            }
            .skills-list {
              color: #4b5563;
            }
            ul {
              padding-left: 1.25rem;
            }
            li {
              margin-bottom: 0.25rem;
            }
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
    // For now, we keep the HTML builder as a fallback. Use the normalized `personal` above for filenames.
    const fileName = `resume-${personal?.firstName || "user"}-${personal?.lastName || "resume"}.pdf`

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
