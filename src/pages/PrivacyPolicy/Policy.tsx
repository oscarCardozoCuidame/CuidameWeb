import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Shield, User, Mail, Phone } from 'lucide-react';
import styles from './Policy.module.css';
import privacyDataHealth from './Policy.health.json';
import privacyDataPets from './Policy.pets.json';

interface PolicyProps {
  policy: 'health' | 'pets';
}

const PrivacyPolicyComponent: React.FC<PolicyProps> = ({ policy }) => {
    const privacyData = policy === 'health' ? privacyDataHealth : privacyDataPets;
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getIcon = (iconName: string) => {
    const iconMap = {
      FileText: <FileText className="w-6 h-6" />,
      Shield: <Shield className="w-6 h-6" />,
      User: <User className="w-6 h-6" />,
      Mail: <Mail className="w-6 h-6" />
    };
    return iconMap[iconName as keyof typeof iconMap] || <FileText className="w-6 h-6" />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className={styles.headerTitle}>{privacyData.header.title}</h1>
              <p className={styles.headerSubtitle}>{privacyData.header.subtitle}</p>
            </div>
          </div>
          <div className={styles.headerInfo}>
            <p>
              <strong>Fecha de entrada en vigencia:</strong> {privacyData.header.effectiveDate}<br/>
              <strong>Última modificación:</strong> {privacyData.header.lastModified}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className={styles.sectionsContainer}>
          {privacyData.sections.map((section) => (
            <div 
              key={section.id} 
              className={`${styles.sectionCard} ${section.id === 'presentation' ? styles.presentation : styles.other}`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={styles.sectionButton}
              >
                <div className={styles.sectionButtonContent}>
                  <div className={styles.sectionIcon}>
                    {getIcon(section.icon)}
                  </div>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                </div>
                {expandedSections[section.id] ? 
                  <ChevronUp className={styles.chevronIcon} /> : 
                  <ChevronDown className={styles.chevronIcon} />
                }
              </button>

              {expandedSections[section.id] && (
                <div className={styles.sectionContent}>
                  {section.id === 'presentation' && (
                    <div className={styles.prose}>
                      <p className={styles.proseText}>{section.content}</p>
                      <div className={styles.infoBox}>
                        <p className={styles.infoBoxText}>
                          {section.additionalInfo}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === 'definitions' && (
                    <div className={styles.definitionsContainer}>
                      {section.definitions?.map((def, index) => (
                        <div key={index} className={styles.definitionItem}>
                          <h3 className={styles.definitionTerm}>{def.term}</h3>
                          <p className={styles.definitionText}>{def.definition}</p>
                        </div>
                      ))}
                      <div className={styles.warningBox}>
                        <p className={styles.warningText}>
                          {section.note}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === 'usage' && (
                    <div>
                      <p className={styles.usageDescription}>
                        {section.description}
                      </p>
                      <div className={styles.usageGrid}>
                        {section.purposes?.map((purpose, index) => (
                          <div key={index} className={styles.usageItem}>
                            <div className={styles.usageBullet}></div>
                            <p className={styles.usageText}>{purpose}</p>
                          </div>
                        ))}
                      </div>
                      <div className={styles.importantBox}>
                        <h4 className={styles.importantTitle}>{section.sensitiveDataNote?.title}</h4>
                        <p className={styles.importantText}>
                          {section.sensitiveDataNote?.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === 'rights' && (
                    <div>
                      <p className={styles.rightsDescription}>
                        {section.description}
                      </p>
                      <div className={styles.rightsContainer}>
                        {section.rights?.map((right, index) => (
                          <div key={index} className={styles.rightItem}>
                            <div className={styles.rightNumber}>{String.fromCharCode(97 + index)}.</div>
                            <p className={styles.rightText}>{right}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === 'procedure' && (
                    <div>
                      <p className={styles.procedureDescription}>
                        {section.description}
                      </p>
                      <div className={styles.contactCard}>
                        <div className={styles.contactItem}>
                          <div className={styles.contactIcon}>
                            <Mail className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={styles.contactTitle}>Correo Electrónico</h3>
                            <p className={styles.contactInfo}>{section.contact?.email}</p>
                          </div>
                        </div>
                        <div className={styles.contactItem}>
                          <div className={styles.contactIcon}>
                            <Phone className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={styles.contactTitle}>Teléfono</h3>
                            <p className={styles.contactInfo}>{section.contact?.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.timeGrid}>
                        {section.timelines?.map((timeline, index) => (
                          <div key={index} className={`${styles.timeCard} ${timeline.style === 'queries' ? styles.timeCardQueries : styles.timeCardClaims}`}>
                            <h4 className={`${styles.timeCardTitle} ${timeline.style === 'queries' ? styles.timeCardTitleQueries : styles.timeCardTitleClaims}`}>
                              {timeline.type}
                            </h4>
                            <p className={`${styles.timeCardText} ${timeline.style === 'queries' ? styles.timeCardTextQueries : styles.timeCardTextClaims}`}>
                              {timeline.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <h3 className={styles.footerTitle}>{privacyData.footer.title}</h3>
            <p className={styles.footerText}>
              {privacyData.footer.text}
            </p>
            <div className={styles.footerInfo}>
              <p className={styles.footerInfoText}>
                <strong>{privacyData.footer.validity}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;