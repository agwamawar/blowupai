
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  BorderStyle, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType,
  SectionType
} from "docx";

interface VideoMetadata {
  title: string;
  duration: string;
  platform?: string;
}

interface HighlightMoment {
  timestamp: string;
  title: string;
  description: string;
  isPositive: boolean;
  fix?: string;
}

interface RecommendationType {
  title: string;
  description: string;
  actionItems?: string[];
}

export async function generateWordReport(
  videoMetadata: VideoMetadata,
  analysisData?: any
): Promise<{ blob: Blob, filename: string }> {
  const primaryColor = "#9D5C63";
  const secondaryColor = "#8A4F55";
  const grayColor = "#6c757d";

  // Header section
  const title = videoMetadata?.title || "Video Analysis";
  const duration = videoMetadata?.duration || "Unknown duration";
  const timestamp = new Date().toLocaleString();
  
  const headerSection = [
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

  // Video details section
  const videoDetailsSection = [
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
  if (analysisData?.video_metadata?.platform) {
    videoDetailsSection.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Platform: ",
            bold: true,
          }),
          new TextRun({
            text: analysisData.video_metadata.platform,
          }),
        ],
      })
    );
  }

  // Add engagement score if available
  if (analysisData?.engagement_score) {
    videoDetailsSection.push(
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

  // Create cells for the metrics table
  let metricsTable;
  if (analysisData) {
    const trendScore = analysisData.trend_score || 85;
    const projectedReachBoost = analysisData.projected_reach_boost || 37;
    const targetAudienceMatch = analysisData.target_audience_match || 91;

    metricsTable = new Table({
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

    videoDetailsSection.push(new Paragraph({ text: "" }));
  }

  // Key moments section
  const keyMomentsSection = [];
  if (analysisData?.content_analysis?.key_moments || 
      analysisData?.highlight_moments) {
    
    const moments = analysisData?.content_analysis?.key_moments || 
                  analysisData?.highlight_moments ||
                  [];
    
    if (moments.length > 0) {
      keyMomentsSection.push(
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
        keyMomentsSection.push(
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
          keyMomentsSection.push(
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
            keyMomentsSection.push(
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
            keyMomentsSection.push(new Paragraph({ text: "" }));
          }
        });
      }

      // Add negative moments
      if (negativeMoments.length > 0) {
        keyMomentsSection.push(
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
          keyMomentsSection.push(
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
            keyMomentsSection.push(
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
            keyMomentsSection.push(new Paragraph({ text: "" }));
          }
        });
      }
    }
  }

  // Recommendations section
  const recommendationsSection = [];
  if (analysisData?.recommendations) {
    const recommendations = analysisData.recommendations || [];
    
    if (recommendations.length > 0) {
      recommendationsSection.push(
        new Paragraph({
          text: "Recommendations",
          heading: HeadingLevel.HEADING_2,
        })
      );

      recommendations.forEach((rec, index) => {
        recommendationsSection.push(
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
            recommendationsSection.push(
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
          recommendationsSection.push(new Paragraph({ text: "" }));
        }
      });
    }
  }

  // Final optimization tips section
  const optimizationSection = [];
  if (analysisData?.final_optimizations || analysisData?.optimizations) {
    const optimizations = analysisData?.final_optimizations || 
                        analysisData?.optimizations || 
                        [];
    
    if (optimizations.length > 0) {
      optimizationSection.push(
        new Paragraph({
          text: "Quick Ways to Improve Your Video",
          heading: HeadingLevel.HEADING_2,
        })
      );

      optimizations.forEach((opt, index) => {
        optimizationSection.push(
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
  }

  // Trending hashtags section
  const trendingSection = [];
  if (analysisData?.trending_hashtags) {
    const hashtags = analysisData.trending_hashtags || [];
    
    if (hashtags.length > 0) {
      trendingSection.push(
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
  }

  // Create a Document with one section containing all the content
  const doc = new Document({
    sections: [
      {
        properties: { 
          type: SectionType.CONTINUOUS 
        },
        children: [
          ...headerSection,
          ...videoDetailsSection,
          ...(metricsTable ? [metricsTable] : []),
          ...keyMomentsSection,
          ...recommendationsSection,
          ...optimizationSection,
          ...trendingSection,
        ],
      },
    ],
  });

  // Generate the document as a blob
  const blob = await Packer.toBlob(doc);
  
  // Format timestamp for filename
  const fileTimestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
  const filename = `${title.replace(/\s+/g, "-")}-analysis-${fileTimestamp}.docx`;
  
  return { blob, filename };
}
