
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType, AlignmentType } from "docx";
import { formatVideoTime } from "@/lib/videoUtils";
import { AnalysisDataType } from "@/types/analysisTypes";

interface VideoMetadata {
  title: string;
  duration: string;
  platform?: string;
}

// Colors for styling the report
const primaryColor = "#9D5C63";
const secondaryColor = "#8A4F55";
const grayColor = "#6c757d";

export async function generateWordReport(
  videoMetadata: VideoMetadata,
  analysisData?: AnalysisDataType
): Promise<Blob> {
  // Create a new document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: createReportContent(videoMetadata, analysisData),
      },
    ],
  });

  // Generate the document as a blob
  return await Packer.toBlob(doc);
}

function createReportContent(videoMetadata: VideoMetadata, analysisData?: AnalysisDataType) {
  const title = videoMetadata?.title || "Video Analysis";
  const duration = videoMetadata?.duration || "Unknown duration";
  const timestamp = new Date().toLocaleString();
  
  return [
    ...createHeaderSection(timestamp),
    ...createVideoDetailsSection(title, duration, videoMetadata?.platform),
    ...(analysisData ? createPerformanceMetricsSection(analysisData) : []),
    ...(analysisData ? createKeyMomentsSection(analysisData) : []),
    ...(analysisData?.recommendations ? createRecommendationsSection(analysisData.recommendations) : []),
    ...(analysisData ? createOptimizationSection(analysisData) : []),
    ...(analysisData?.trending_hashtags ? createTrendingHashtagsSection(analysisData.trending_hashtags) : [])
  ];
}

function createHeaderSection(timestamp: string) {
  return [
    new Paragraph({
      text: "VIDEO ANALYSIS REPORT",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated on: ${timestamp}`,
          italics: true,
          color: grayColor,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: "",
    }),
  ];
}

function createVideoDetailsSection(title: string, duration: string, platform?: string) {
  const section = [
    new Paragraph({
      text: "Video Details",
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Title: ",
          bold: true,
        }),
        new TextRun({
          text: title,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Duration: ",
          bold: true,
        }),
        new TextRun({
          text: duration,
        }),
      ],
    }),
  ];

  // Add platform if available
  if (platform) {
    section.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Platform: ",
            bold: true,
          }),
          new TextRun({
            text: platform,
          }),
        ],
      })
    );
  }
  
  return section;
}

function createPerformanceMetricsSection(analysisData: AnalysisDataType) {
  const section = [];
  
  if (analysisData?.engagement_score) {
    section.push(
      new Paragraph({
        text: "",
      }),
      new Paragraph({
        text: "Performance Metrics",
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Engagement Score: ",
            bold: true,
          }),
          new TextRun({
            text: `${analysisData.engagement_score}/100`,
            color: primaryColor,
          }),
        ],
      })
    );
  }

  // Create metrics table
  const trendScore = analysisData.trend_score || 85;
  const projectedReachBoost = analysisData.projected_reach_boost || 37;
  const targetAudienceMatch = analysisData.target_audience_match || 91;

  const metricsTable = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${trendScore}/100`,
                    bold: true,
                    size: 28,
                    color: primaryColor,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "How Viral Your Video Could Be",
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              left: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              right: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
            },
            shading: {
              fill: "#F9FAFB",
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `+${projectedReachBoost}%`,
                    bold: true,
                    size: 28,
                    color: "#10B981", // green color
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "More Views You Could Get",
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              left: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              right: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
            },
            shading: {
              fill: "#F9FAFB",
            },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${targetAudienceMatch}%`,
                    bold: true,
                    size: 28,
                    color: primaryColor,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Right Audience Match",
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              left: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
              right: { style: BorderStyle.SINGLE, size: 1, color: "#E5E7EB" },
            },
            shading: {
              fill: "#F9FAFB",
            },
          }),
        ],
      }),
    ],
  });

  section.push(new Paragraph({ text: "" }), metricsTable);
  return section;
}

function createKeyMomentsSection(analysisData: AnalysisDataType) {
  const section = [];
  
  const moments = analysisData?.content_analysis?.key_moments || 
                  analysisData?.highlight_moments ||
                  [];
  
  if (moments.length > 0) {
    section.push(
      new Paragraph({
        text: "Key Moments",
        heading: HeadingLevel.HEADING_2,
      })
    );

    // Group by positive and negative moments
    const positiveMoments = moments.filter(moment => moment.isPositive);
    const negativeMoments = moments.filter(moment => !moment.isPositive);

    // Add positive moments
    if (positiveMoments.length > 0) {
      section.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Great Moments That Work",
              bold: true,
              size: 26,
            }),
          ],
        })
      );

      positiveMoments.forEach((moment, index) => {
        section.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${moment.timestamp}: `,
                bold: true,
                color: "#10B981", // green
              }),
              new TextRun({
                text: `${moment.title}`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: moment.description,
              }),
            ],
            indent: {
              left: 360, // 0.25 inches in twips
            },
          })
        );

        if (moment.fix) {
          section.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "Make it even better: ",
                  italics: true,
                  color: "#10B981", // green
                }),
                new TextRun({
                  text: moment.fix,
                  italics: true,
                }),
              ],
              indent: {
                left: 360,
              },
            })
          );
        }

        if (index < positiveMoments.length - 1) {
          section.push(new Paragraph({ text: "" }));
        }
      });
    }

    // Add negative moments
    if (negativeMoments.length > 0) {
      section.push(
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Problem Spots & How to Fix Them",
              bold: true,
              size: 26,
            }),
          ],
        })
      );

      negativeMoments.forEach((moment, index) => {
        section.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${moment.timestamp}: `,
                bold: true,
                color: "#F59E0B", // amber
              }),
              new TextRun({
                text: `${moment.title}`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: moment.description,
              }),
            ],
            indent: {
              left: 360,
            },
          })
        );

        if (moment.fix) {
          section.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "Fix it: ",
                  italics: true,
                  color: "#F59E0B", // amber
                }),
                new TextRun({
                  text: moment.fix,
                  italics: true,
                }),
              ],
              indent: {
                left: 360,
              },
            })
          );
        }

        if (index < negativeMoments.length - 1) {
          section.push(new Paragraph({ text: "" }));
        }
      });
    }
  }
  
  return section;
}

function createRecommendationsSection(recommendations: any[]) {
  const section = [];
  
  if (recommendations.length > 0) {
    section.push(
      new Paragraph({
        text: "Recommendations",
        heading: HeadingLevel.HEADING_2,
      })
    );

    recommendations.forEach((rec, index) => {
      section.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${index + 1}. ${rec.title}`,
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: rec.description,
            }),
          ],
          indent: {
            left: 360,
          },
        })
      );

      if (rec.actionItems && rec.actionItems.length > 0) {
        rec.actionItems.forEach(item => {
          section.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${item}`,
                }),
              ],
              indent: {
                left: 720, // 0.5 inches in twips
              },
            })
          );
        });
      }

      if (index < recommendations.length - 1) {
        section.push(new Paragraph({ text: "" }));
      }
    });
  }
  
  return section;
}

function createOptimizationSection(analysisData: AnalysisDataType) {
  const section = [];
  
  const optimizations = analysisData?.final_optimizations || 
                        analysisData?.optimizations || 
                        [];
  
  if (optimizations.length > 0) {
    section.push(
      new Paragraph({
        text: "Quick Ways to Improve Your Video",
        heading: HeadingLevel.HEADING_2,
      })
    );

    optimizations.forEach((opt, index) => {
      section.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${index + 1}. `,
              bold: true,
              color: "#10B981", // green
            }),
            new TextRun({
              text: opt,
            }),
          ],
        })
      );
    });
  }
  
  return section;
}

function createTrendingHashtagsSection(hashtags: string[]) {
  const section = [];
  
  if (hashtags.length > 0) {
    section.push(
      new Paragraph({
        text: "Trending Hashtags",
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Include these hashtags to boost your reach: ",
          }),
        ],
      }),
      new Paragraph({
        children: hashtags.map(tag => 
          new TextRun({
            text: `${tag} `,
            color: primaryColor,
            bold: true,
          })
        ),
      })
    );
  }
  
  return section;
}

export async function downloadWordReport(
  videoMetadata: VideoMetadata,
  analysisData?: AnalysisDataType,
  onSuccess?: () => void
) {
  try {
    // Generate the document as a blob
    const blob = await generateWordReport(videoMetadata, analysisData);
    
    // Format timestamp for filename
    const fileTimestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
    const filename = `${videoMetadata.title.replace(/\s+/g, "-")}-analysis-${fileTimestamp}.docx`;
    
    // Create download link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    if (onSuccess) {
      onSuccess();
    }
    
    return true;
  } catch (error) {
    console.error("Error generating Word document:", error);
    return false;
  }
}
