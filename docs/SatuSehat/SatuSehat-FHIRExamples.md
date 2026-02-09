# SATU SEHAT - Contoh FHIR Resource Lengkap

**Referensi:** [SatuSehat.md](./SatuSehat.md)

---

## 📋 Daftar Contoh Resource

1. [Patient](#patient)
2. [Practitioner](#practitioner)
3. [Encounter - Rawat Jalan](#encounter-ralan)
4. [Observation - Tanda Vital](#observation-ttv)
5. [Condition - Diagnosis](#condition)
6. [Procedure](#procedure)
7. [MedicationRequest](#medication-request)
8. [MedicationDispense](#medication-dispense)
9. [DiagnosticReport - Lab](#diagnostic-report)
10. [Composition - Resume Medis](#composition)

---

## 1. Patient {#patient}

```json
{
  "resourceType": "Patient",
  "meta": {
    "profile": [
      "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
    ]
  },
  "identifier": [
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/nik",
      "value": "3201234567890123"
    },
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/norm",
      "value": "000001"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "text": "Budi Santoso"
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "081234567890",
      "use": "mobile"
    },
    {
      "system": "email",
      "value": "budi.santoso@email.com"
    }
  ],
  "gender": "male",
  "birthDate": "1990-05-15",
  "address": [
    {
      "use": "home",
      "line": [
        "Jl. Merdeka No. 123, RT 02/RW 05"
      ],
      "city": "Bogor",
      "state": "Jawa Barat",
      "postalCode": "16111",
      "country": "ID"
    }
  ],
  "maritalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
        "code": "M",
        "display": "Married"
      }
    ]
  },
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "C",
              "display": "Emergency Contact"
            }
          ]
        }
      ],
      "name": {
        "use": "official",
        "text": "Siti Rahayu"
      },
      "telecom": [
        {
          "system": "phone",
          "value": "081298765432",
          "use": "mobile"
        }
      ]
    }
  ]
}
```

---

## 2. Practitioner {#practitioner}

```json
{
  "resourceType": "Practitioner",
  "meta": {
    "profile": [
      "https://fhir.kemkes.go.id/r4/StructureDefinition/Practitioner"
    ]
  },
  "identifier": [
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/nik",
      "value": "3201987654321098"
    },
    {
      "use": "official",
      "system": "https://fhir.kemkes.go.id/id/nakes",
      "value": "D123456789"
    }
  ],
  "name": [
    {
      "use": "official",
      "text": "dr. Ahmad Wirawan, Sp.PD",
      "prefix": ["dr."],
      "given": ["Ahmad"],
      "family": "Wirawan",
      "suffix": ["Sp.PD"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "081122334455",
      "use": "work"
    }
  ],
  "gender": "male",
  "birthDate": "1980-03-20",
  "qualification": [
    {
      "code": {
        "coding": [
          {
            "system": "http://terminology.kemkes.go.id/CodeSystem/profesi-tenaga-kesehatan",
            "code": "1",
            "display": "Dokter"
          }
        ]
      },
      "identifier": [
        {
          "system": "https://fhir.kemkes.go.id/id/str",
          "value": "STR123456789"
        }
      ]
    }
  ]
}
```

---

## 3. Encounter - Rawat Jalan {#encounter-ralan}

```json
{
  "resourceType": "Encounter",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/encounter/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "value": "2024/01/15/00001"
    }
  ],
  "status": "finished",
  "class": {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    "code": "AMB",
    "display": "ambulatory"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "participant": [
    {
      "type": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
              "code": "ATND",
              "display": "attender"
            }
          ]
        }
      ],
      "individual": {
        "reference": "Practitioner/N10000001",
        "display": "dr. Ahmad Wirawan, Sp.PD"
      }
    }
  ],
  "period": {
    "start": "2024-01-15T08:00:00+07:00",
    "end": "2024-01-15T09:30:00+07:00"
  },
  "location": [
    {
      "location": {
        "reference": "Location/ef011065-38c9-46f8-9c35-d1fe68966a3e",
        "display": "Poli Penyakit Dalam"
      }
    }
  ],
  "statusHistory": [
    {
      "status": "arrived",
      "period": {
        "start": "2024-01-15T08:00:00+07:00",
        "end": "2024-01-15T08:15:00+07:00"
      }
    },
    {
      "status": "in-progress",
      "period": {
        "start": "2024-01-15T08:15:00+07:00",
        "end": "2024-01-15T09:30:00+07:00"
      }
    }
  ],
  "serviceProvider": {
    "reference": "Organization/8529d474-30e0-4fee-81a4-7a5234003a1b"
  },
  "diagnosis": [
    {
      "condition": {
        "reference": "Condition/abc123",
        "display": "Type 2 Diabetes Mellitus"
      },
      "use": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/diagnosis-role",
            "code": "AD",
            "display": "Admission diagnosis"
          }
        ]
      },
      "rank": 1
    }
  ]
}
```

---

## 4. Observation - Tanda Vital (Blood Pressure) {#observation-ttv}

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "Blood pressure panel with all children optional"
      }
    ]
  },
  "subject": {
    "reference": "Patient/100000030009"
  },
  "performer": [
    {
      "reference": "Practitioner/N10000001"
    }
  ],
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "effectiveDateTime": "2024-01-15T08:15:00+07:00",
  "issued": "2024-01-15T08:15:00+07:00",
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "Systolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 120,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    },
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "Diastolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 80,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    }
  ]
}
```

---

## 5. Condition - Diagnosis {#condition}

```json
{
  "resourceType": "Condition",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active",
        "display": "Active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10",
        "code": "E11",
        "display": "Type 2 diabetes mellitus"
      }
    ],
    "text": "Diabetes Melitus Tipe 2"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "onsetDateTime": "2023-06-10",
  "recordedDate": "2024-01-15T08:30:00+07:00",
  "recorder": {
    "reference": "Practitioner/N10000001"
  },
  "note": [
    {
      "text": "Pasien mengeluh sering haus dan BAK, sudah 3 bulan terakhir"
    }
  ]
}
```

---

## 6. Procedure {#procedure}

```json
{
  "resourceType": "Procedure",
  "status": "completed",
  "category": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "103693007",
        "display": "Diagnostic procedure"
      }
    ]
  },
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-9-cm",
        "code": "93.18",
        "display": "Electrocardiogram"
      }
    ],
    "text": "Pemeriksaan EKG"
  },
  "subject": {
    "reference": "Patient/100000030009"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "performedDateTime": "2024-01-15T08:45:00+07:00",
  "performer": [
    {
      "actor": {
        "reference": "Practitioner/N10000001",
        "display": "dr. Ahmad Wirawan, Sp.PD"
      }
    }
  ],
  "reasonCode": [
    {
      "coding": [
        {
          "system": "http://hl7.org/fhir/sid/icd-10",
          "code": "E11",
          "display": "Type 2 diabetes mellitus"
        }
      ]
    }
  ],
  "note": [
    {
      "text": "Hasil EKG dalam batas normal"
    }
  ]
}
```

---

## 7. MedicationRequest {#medication-request}

```json
{
  "resourceType": "MedicationRequest",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/prescription/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "use": "official",
      "value": "RES/2024/01/15/00001"
    }
  ],
  "status": "active",
  "intent": "order",
  "medicationReference": {
    "reference": "Medication/abc-metformin",
    "display": "Metformin 500mg Tablet"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "authoredOn": "2024-01-15T09:00:00+07:00",
  "requester": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "dosageInstruction": [
    {
      "sequence": 1,
      "text": "3 x sehari 1 tablet sesudah makan",
      "timing": {
        "repeat": {
          "frequency": 3,
          "period": 1,
          "periodUnit": "d"
        }
      },
      "route": {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "26643006",
            "display": "Oral route"
          }
        ]
      },
      "doseAndRate": [
        {
          "doseQuantity": {
            "value": 1,
            "unit": "tablet",
            "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
            "code": "TAB"
          }
        }
      ]
    }
  ],
  "dispenseRequest": {
    "quantity": {
      "value": 90,
      "unit": "tablet",
      "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
      "code": "TAB"
    },
    "expectedSupplyDuration": {
      "value": 30,
      "unit": "days",
      "system": "http://unitsofmeasure.org",
      "code": "d"
    }
  }
}
```

---

## 8. MedicationDispense (Pengeluaran Obat) {#medication-dispense}

```json
{
  "resourceType": "MedicationDispense",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/prescription/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "use": "official",
      "value": "DISP/2024/01/15/00001"
    }
  ],
  "status": "completed",
  "medicationReference": {
    "reference": "Medication/abc-metformin",
    "display": "Metformin 500mg Tablet"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "context": {
    "reference": "Encounter/abc-123"
  },
  "performer": [
    {
      "actor": {
        "reference": "Practitioner/N10000002",
        "display": "Apt. Siti Rahma"
      }
    }
  ],
  "authorizingPrescription": [
    {
      "reference": "MedicationRequest/abc-mr-001"
    }
  ],
  "quantity": {
    "value": 90,
    "unit": "tablet",
    "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
    "code": "TAB"
  },
  "daysSupply": {
    "value": 30,
    "unit": "Day",
    "system": "http://unitsofmeasure.org",
    "code": "d"
  },
  "whenPrepared": "2024-01-15T09:15:00+07:00",
  "whenHandedOver": "2024-01-15T09:20:00+07:00",
  "dosageInstruction": [
    {
      "sequence": 1,
      "text": "3 x sehari 1 tablet sesudah makan",
      "timing": {
        "repeat": {
          "frequency": 3,
          "period": 1,
          "periodUnit": "d"
        }
      }
    }
  ]
}
```

---

## 9. AllergyIntolerance (Alergi) {#allergy-intolerance}

```json
{
  "resourceType": "AllergyIntolerance",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        "code": "active",
        "display": "Active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ]
  },
  "type": "allergy",
  "category": ["medication"],
  "criticality": "high",
  "code": {
    "coding": [
      {
        "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
        "code": "7980",
        "display": "Penicillin"
      }
    ],
    "text": "Penisilin"
  },
  "patient": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "recordedDate": "2024-01-15T08:20:00+07:00",
  "recorder": {
    "reference": "Practitioner/N10000001"
  },
  "asserter": {
    "reference": "Patient/100000030009"
  },
  "lastOccurrence": "2023-05-10",
  "note": [
    {
      "text": "Pasien mengalami ruam kemerahan dan gatal setelah konsumsi antibiotik penisilin"
    }
  ],
  "reaction": [
    {
      "substance": {
        "coding": [
          {
            "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
            "code": "7980",
            "display": "Penicillin"
          }
        ]
      },
      "manifestation": [
        {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "271807003",
              "display": "Skin rash"
            }
          ],
          "text": "Ruam kulit"
        }
      ],
      "severity": "moderate",
      "onset": "2023-05-10"
    }
  ]
}
```

---

## 10. FamilyMemberHistory (Riwayat Penyakit Keluarga) {#family-member-history}

```json
{
  "resourceType": "FamilyMemberHistory",
  "status": "completed",
  "patient": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "date": "2024-01-15",
  "relationship": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
        "code": "FTH",
        "display": "father"
      }
    ],
    "text": "Ayah"
  },
  "sex": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/administrative-gender",
        "code": "male",
        "display": "Male"
      }
    ]
  },
  "condition": [
    {
      "code": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/icd-10",
            "code": "I10",
            "display": "Essential (primary) hypertension"
          }
        ],
        "text": "Hipertensi"
      },
      "onsetAge": {
        "value": 45,
        "unit": "year",
        "system": "http://unitsofmeasure.org",
        "code": "a"
      },
      "note": [
        {
          "text": "Ayah pasien didiagnosis hipertensi sejak usia 45 tahun"
        }
      ]
    }
  ]
}
```

---

## 11. ClinicalImpression (Kesimpulan Klinis) {#clinical-impression}

```json
{
  "resourceType": "ClinicalImpression",
  "status": "completed",
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "effectiveDateTime": "2024-01-15T09:00:00+07:00",
  "date": "2024-01-15T09:00:00+07:00",
  "assessor": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "problem": [
    {
      "reference": "Condition/abc-dm-001",
      "display": "Type 2 Diabetes Mellitus"
    }
  ],
  "summary": "Pasien laki-laki 34 tahun dengan keluhan poliuria, polidipsia selama 3 bulan terakhir. Pemeriksaan fisik dalam batas normal. Hasil lab menunjukkan GDP 180 mg/dL, GD2PP 250 mg/dL, HbA1c 8.5%.",
  "finding": [
    {
      "itemCodeableConcept": {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "56018004",
            "display": "Wheezing"
          }
        ]
      },
      "basis": "Pasien mengeluh sering haus dan buang air kecil"
    }
  ],
  "prognosisCodeableConcept": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "170968001",
          "display": "Good prognosis"
        }
      ],
      "text": "Prognosis baik dengan kontrol gula darah yang baik"
    }
  ],
  "note": [
    {
      "text": "Pasien perlu edukasi tentang diet diabetes dan pentingnya olahraga rutin. Follow up 2 minggu untuk evaluasi respons terapi."
    }
  ]
}
```

---

## 12. Goal (Tujuan Perawatan) {#goal}

```json
{
  "resourceType": "Goal",
  "lifecycleStatus": "active",
  "achievementStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/goal-achievement",
        "code": "in-progress",
        "display": "In Progress"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/goal-category",
          "code": "dietary",
          "display": "Dietary"
        }
      ]
    }
  ],
  "priority": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/goal-priority",
        "code": "high-priority",
        "display": "High Priority"
      }
    ]
  },
  "description": {
    "text": "Menurunkan kadar gula darah puasa < 126 mg/dL dalam 3 bulan"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "startDate": "2024-01-15",
  "target": [
    {
      "measure": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "1558-6",
            "display": "Fasting glucose [Mass/volume] in Serum or Plasma"
          }
        ]
      },
      "detailQuantity": {
        "value": 126,
        "comparator": "<",
        "unit": "mg/dL",
        "system": "http://unitsofmeasure.org",
        "code": "mg/dL"
      },
      "dueDate": "2024-04-15"
    }
  ],
  "expressedBy": {
    "reference": "Practitioner/N10000001"
  },
  "addresses": [
    {
      "reference": "Condition/abc-dm-001",
      "display": "Type 2 Diabetes Mellitus"
    }
  ]
}
```

---

## 13. CarePlan (Rencana Perawatan) {#care-plan}

```json
{
  "resourceType": "CarePlan",
  "status": "active",
  "intent": "plan",
  "category": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "734163000",
          "display": "Care plan"
        }
      ]
    }
  ],
  "title": "Diabetes Management Care Plan",
  "description": "Rencana penatalaksanaan diabetes melitus tipe 2",
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "period": {
    "start": "2024-01-15",
    "end": "2024-07-15"
  },
  "created": "2024-01-15",
  "author": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "addresses": [
    {
      "reference": "Condition/abc-dm-001",
      "display": "Type 2 Diabetes Mellitus"
    }
  ],
  "goal": [
    {
      "reference": "Goal/abc-goal-001"
    }
  ],
  "activity": [
    {
      "detail": {
        "kind": "MedicationRequest",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "182834008",
              "display": "Drug therapy"
            }
          ],
          "text": "Terapi Metformin"
        },
        "status": "in-progress",
        "scheduledTiming": {
          "repeat": {
            "frequency": 3,
            "period": 1,
            "periodUnit": "d"
          }
        },
        "description": "Metformin 500mg 3x sehari"
      }
    },
    {
      "detail": {
        "kind": "ServiceRequest",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "226234005",
              "display": "Healthy diet"
            }
          ],
          "text": "Diet Diabetes"
        },
        "status": "in-progress",
        "description": "Diet rendah gula dan karbohidrat sederhana, tinggi serat"
      }
    },
    {
      "detail": {
        "kind": "ServiceRequest",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "229065009",
              "display": "Exercise therapy"
            }
          ],
          "text": "Olahraga Rutin"
        },
        "status": "in-progress",
        "scheduledTiming": {
          "repeat": {
            "frequency": 3,
            "period": 1,
            "periodUnit": "wk"
          }
        },
        "description": "Jalan kaki atau jogging 30 menit, 3x seminggu"
      }
    }
  ],
  "note": [
    {
      "text": "Pasien perlu monitoring gula darah mandiri minimal 2x seminggu. Follow up ke poliklinik setiap bulan untuk evaluasi."
    }
  ]
}
```

---

## 14. ServiceRequest (Permintaan Pemeriksaan Lab) {#service-request}

```json
{
  "resourceType": "ServiceRequest",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/servicerequest/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "value": "LAB/2024/01/15/00001"
    }
  ],
  "status": "active",
  "intent": "order",
  "category": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "108252007",
          "display": "Laboratory procedure"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "4548-4",
        "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
      }
    ],
    "text": "Pemeriksaan HbA1c"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "occurrenceDateTime": "2024-01-15T10:00:00+07:00",
  "requester": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "performer": [
    {
      "reference": "Organization/lab-001",
      "display": "Laboratorium Klinik"
    }
  ],
  "reasonCode": [
    {
      "coding": [
        {
          "system": "http://hl7.org/fhir/sid/icd-10",
          "code": "E11",
          "display": "Type 2 diabetes mellitus"
        }
      ]
    }
  ],
  "specimen": [
    {
      "reference": "Specimen/abc-specimen-001"
    }
  ],
  "note": [
    {
      "text": "Pasien puasa minimal 8 jam"
    }
  ]
}
```

---

## 15. Specimen (Spesimen Lab) {#specimen}

```json
{
  "resourceType": "Specimen",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/specimen/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "value": "SPEC/2024/01/15/00001"
    }
  ],
  "status": "available",
  "type": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "119297000",
        "display": "Blood specimen"
      }
    ],
    "text": "Darah Vena"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "receivedTime": "2024-01-15T10:00:00+07:00",
  "request": [
    {
      "reference": "ServiceRequest/abc-sr-001"
    }
  ],
  "collection": {
    "collector": {
      "reference": "Practitioner/N10000003",
      "display": "Petugas Lab"
    },
    "collectedDateTime": "2024-01-15T09:45:00+07:00",
    "quantity": {
      "value": 3,
      "unit": "mL"
    },
    "bodySite": {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "368208006",
          "display": "Structure of left antecubital vein"
        }
      ],
      "text": "Vena cubiti sinistra"
    }
  },
  "container": [
    {
      "identifier": [
        {
          "value": "EDTA-001"
        }
      ],
      "type": {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "702281005",
            "display": "Evacuated blood collection tube with ethylenediaminetetraacetic acid"
          }
        ],
        "text": "Tabung EDTA"
      }
    }
  ],
  "note": [
    {
      "text": "Spesimen dalam kondisi baik, tidak hemolisis"
    }
  ]
}
```

---

## 16. Observation (Hasil Lab - HbA1c) {#observation-lab}

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "laboratory",
          "display": "Laboratory"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "4548-4",
        "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
      }
    ],
    "text": "HbA1c"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "effectiveDateTime": "2024-01-15T11:30:00+07:00",
  "issued": "2024-01-15T14:00:00+07:00",
  "performer": [
    {
      "reference": "Organization/lab-001",
      "display": "Laboratorium Klinik"
    }
  ],
  "valueQuantity": {
    "value": 8.5,
    "unit": "%",
    "system": "http://unitsofmeasure.org",
    "code": "%"
  },
  "interpretation": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          "code": "H",
          "display": "High"
        }
      ]
    }
  ],
  "referenceRange": [
    {
      "low": {
        "value": 4.0,
        "unit": "%"
      },
      "high": {
        "value": 5.7,
        "unit": "%"
      },
      "text": "Normal: 4.0 - 5.7%"
    }
  ],
  "specimen": {
    "reference": "Specimen/abc-specimen-001"
  }
}
```

---

## 17. DiagnosticReport (Laporan Lab) {#diagnostic-report}

```json
{
  "resourceType": "DiagnosticReport",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/diagnosticreport/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "value": "DR/2024/01/15/00001"
    }
  ],
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
          "code": "LAB",
          "display": "Laboratory"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "4548-4",
        "display": "Hemoglobin A1c panel"
      }
    ],
    "text": "Pemeriksaan Laboratorium HbA1c"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "effectiveDateTime": "2024-01-15T11:30:00+07:00",
  "issued": "2024-01-15T14:00:00+07:00",
  "performer": [
    {
      "reference": "Organization/lab-001",
      "display": "Laboratorium Klinik"
    }
  ],
  "resultsInterpreter": [
    {
      "reference": "Practitioner/N10000004",
      "display": "dr. Lab Specialist"
    }
  ],
  "result": [
    {
      "reference": "Observation/abc-obs-hba1c"
    }
  ],
  "specimen": [
    {
      "reference": "Specimen/abc-specimen-001"
    }
  ],
  "conclusion": "Hasil HbA1c menunjukkan kontrol gula darah yang buruk (8.5%). Diperlukan penyesuaian terapi dan monitoring ketat.",
  "conclusionCode": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "166922004",
          "display": "Hemoglobin A1c level above target"
        }
      ]
    }
  ]
}
```

---

## 18. NutritionOrder (Diet) {#nutrition-order}

```json
{
  "resourceType": "NutritionOrder",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/nutritionorder/8529d474-30e0-4fee-81a4-7a5234003a1b",
      "value": "DIET/2024/01/15/00001"
    }
  ],
  "status": "active",
  "intent": "order",
  "patient": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "dateTime": "2024-01-15T09:30:00+07:00",
  "orderer": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "allergyIntolerance": [
    {
      "reference": "AllergyIntolerance/abc-allergy-001"
    }
  ],
  "foodPreferenceModifier": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/diet",
          "code": "halal",
          "display": "Halal"
        }
      ]
    }
  ],
  "oralDiet": {
    "type": [
      {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "435771000124102",
            "display": "Diabetic diet"
          }
        ],
        "text": "Diet Diabetes Melitus"
      }
    ],
    "schedule": [
      {
        "repeat": {
          "boundsPeriod": {
            "start": "2024-01-15"
          },
          "frequency": 3,
          "period": 1,
          "periodUnit": "d"
        }
      }
    ],
    "nutrient": [
      {
        "modifier": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "2331003",
              "display": "Carbohydrate"
            }
          ]
        },
        "amount": {
          "value": 150,
          "unit": "gram",
          "system": "http://unitsofmeasure.org",
          "code": "g"
        }
      }
    ],
    "instruction": "Diet rendah gula dan karbohidrat sederhana. Hindari makanan manis, nasi putih berlebih. Perbanyak sayuran dan protein. Makan teratur 3x sehari dengan porsi kecil."
  }
}
```

---

## 19. QuestionnaireResponse (Pengkajian Resep) {#questionnaire-response}

```json
{
  "resourceType": "QuestionnaireResponse",
  "identifier": {
    "system": "http://sys-ids.kemkes.go.id/questionnaireresponse/8529d474-30e0-4fee-81a4-7a5234003a1b",
    "value": "QR/2024/01/15/00001"
  },
  "questionnaire": "https://fhir.kemkes.go.id/Questionnaire/Q0001",
  "status": "completed",
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "authored": "2024-01-15T09:10:00+07:00",
  "author": {
    "reference": "Practitioner/N10000002",
    "display": "Apt. Siti Rahma"
  },
  "source": {
    "reference": "Patient/100000030009"
  },
  "item": [
    {
      "linkId": "1",
      "text": "Apakah dosis sudah tepat?",
      "answer": [
        {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Yes"
          }
        }
      ]
    },
    {
      "linkId": "2",
      "text": "Apakah ada interaksi obat?",
      "answer": [
        {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        }
      ]
    },
    {
      "linkId": "3",
      "text": "Apakah ada kontraindikasi?",
      "answer": [
        {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        }
      ]
    },
    {
      "linkId": "4",
      "text": "Catatan Apoteker",
      "answer": [
        {
          "valueString": "Resep sesuai dan dapat dilayani. Pasien telah diberikan edukasi tentang cara minum obat."
        }
      ]
    }
  ]
}
```

---

## 20. Composition (Resume Medis Rawat Jalan) {#composition}

```json
{
  "resourceType": "Composition",
  "identifier": {
    "system": "http://sys-ids.kemkes.go.id/composition/8529d474-30e0-4fee-81a4-7a5234003a1b",
    "value": "COMP/2024/01/15/00001"
  },
  "status": "final",
  "type": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "11503-0",
        "display": "Medical records"
      }
    ],
    "text": "Resume Medis Rawat Jalan"
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "371531000",
          "display": "Report of clinical encounter"
        }
      ]
    }
  ],
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "date": "2024-01-15T15:00:00+07:00",
  "author": [
    {
      "reference": "Practitioner/N10000001",
      "display": "dr. Ahmad Wirawan, Sp.PD"
    }
  ],
  "title": "Resume Medis Rawat Jalan - Diabetes Mellitus Tipe 2",
  "custodian": {
    "reference": "Organization/8529d474-30e0-4fee-81a4-7a5234003a1b"
  },
  "section": [
    {
      "title": "Keluhan Utama",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "10154-3",
            "display": "Chief complaint Narrative"
          }
        ]
      },
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Sering haus dan buang air kecil</div>"
      }
    },
    {
      "title": "Riwayat Penyakit Sekarang",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "10164-2",
            "display": "History of Present illness Narrative"
          }
        ]
      },
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Pasien mengeluh sering haus dan BAK sejak 3 bulan terakhir. Juga merasa mudah lelah. Belum pernah berobat sebelumnya.</div>"
      }
    },
    {
      "title": "Riwayat Penyakit Dahulu",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "11348-0",
            "display": "History of Past illness Narrative"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/abc-past-001"
        }
      ]
    },
    {
      "title": "Riwayat Alergi",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "48765-2",
            "display": "Allergies and adverse reactions"
          }
        ]
      },
      "entry": [
        {
          "reference": "AllergyIntolerance/abc-allergy-001"
        }
      ]
    },
    {
      "title": "Pemeriksaan Fisik",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29545-1",
            "display": "Physical findings Narrative"
          }
        ]
      },
      "entry": [
        {
          "reference": "Observation/abc-obs-bp"
        },
        {
          "reference": "Observation/abc-obs-hr"
        }
      ],
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">TD: 120/80 mmHg, Nadi: 82x/menit, RR: 20x/menit, Suhu: 36.5°C. Pemeriksaan fisik lain dalam batas normal.</div>"
      }
    },
    {
      "title": "Hasil Pemeriksaan Penunjang",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "30954-2",
            "display": "Relevant diagnostic tests/laboratory data Narrative"
          }
        ]
      },
      "entry": [
        {
          "reference": "DiagnosticReport/abc-dr-001"
        }
      ]
    },
    {
      "title": "Diagnosis",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29308-4",
            "display": "Diagnosis"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/abc-dm-001"
        }
      ]
    },
    {
      "title": "Rencana Tatalaksana",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "18776-5",
            "display": "Plan of care note"
          }
        ]
      },
      "entry": [
        {
          "reference": "CarePlan/abc-cp-001"
        },
        {
          "reference": "MedicationRequest/abc-mr-001"
        }
      ]
    },
    {
      "title": "Edukasi",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "69730-0",
            "display": "Patient education note"
          }
        ]
      },
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Pasien telah diberikan edukasi tentang:\n        - Diet diabetes\n        - Pentingnya olahraga rutin\n        - Monitoring gula darah mandiri\n        - Cara minum obat yang benar</div>"
      }
    },
    {
      "title": "Prognosis",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "59770-8",
            "display": "Procedure estimated length of stay Narrative"
          }
        ]
      },
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Prognosis baik dengan kontrol gula darah yang baik dan kepatuhan terapi</div>"
      }
    }
  ]
}
```

---

## 21. DocumentReference (Dokumen Resep PDF) {#document-reference}

```json
{
  "resourceType": "DocumentReference",
  "status": "current",
  "type": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "57833-6",
        "display": "Prescription for medication"
      }
    ],
    "text": "Resep Obat"
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://ihe.net/fhir/ValueSet/IHE.FormatCode.codesystem",
          "code": "urn:ihe:pharm:pre:2010",
          "display": "Pharmacy Prescription"
        }
      ]
    }
  ],
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "date": "2024-01-15T09:00:00+07:00",
  "author": [
    {
      "reference": "Practitioner/N10000001",
      "display": "dr. Ahmad Wirawan, Sp.PD"
    }
  ],
  "authenticator": {
    "reference": "Practitioner/N10000001"
  },
  "content": [
    {
      "attachment": {
        "contentType": "application/pdf",
        "language": "id-ID",
        "data": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEK...",
        "title": "Resep_Budi_Santoso_20240115.pdf",
        "creation": "2024-01-15T09:00:00+07:00"
      },
      "format": {
        "system": "http://ihe.net/fhir/ValueSet/IHE.FormatCode.codesystem",
        "code": "urn:ihe:pharm:pre:2010"
      }
    }
  ],
  "context": {
    "encounter": [
      {
        "reference": "Encounter/abc-123"
      }
    ],
    "related": [
      {
        "reference": "MedicationRequest/abc-mr-001"
      }
    ]
  }
}
```

---

## 22. MedicationAdministration (Pemberian Obat) {#medication-administration}

```json
{
  "resourceType": "MedicationAdministration",
  "status": "completed",
  "medicationReference": {
    "reference": "Medication/abc-insulin",
    "display": "Insulin Rapid Acting 100 IU/mL"
  },
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "context": {
    "reference": "Encounter/abc-ranap-001"
  },
  "effectiveDateTime": "2024-01-16T08:00:00+07:00",
  "performer": [
    {
      "actor": {
        "reference": "Practitioner/N10000005",
        "display": "Ns. Dewi Lestari"
      }
    }
  ],
  "request": {
    "reference": "MedicationRequest/abc-mr-insulin"
  },
  "dosage": {
    "text": "6 unit subkutan sebelum makan",
    "route": {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "34206005",
          "display": "Subcutaneous route"
        }
      ]
    },
    "dose": {
      "value": 6,
      "unit": "unit",
      "system": "http://unitsofmeasure.org",
      "code": "U"
    }
  },
  "note": [
    {
      "text": "Pemberian insulin sesuai jadwal. Pasien tidak ada keluhan."
    }
  ]
}
```

---

## 23. RiskAssessment (Penilaian Risiko) {#risk-assessment}

```json
{
  "resourceType": "RiskAssessment",
  "status": "final",
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Budi Santoso"
  },
  "encounter": {
    "reference": "Encounter/abc-123"
  },
  "occurrenceDateTime": "2024-01-15T09:00:00+07:00",
  "performer": {
    "reference": "Practitioner/N10000001",
    "display": "dr. Ahmad Wirawan, Sp.PD"
  },
  "basis": [
    {
      "reference": "Observation/abc-obs-hba1c"
    },
    {
      "reference": "Condition/abc-dm-001"
    }
  ],
  "prediction": [
    {
      "outcome": {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "368581000119106",
            "display": "Neuropathy due to type 2 diabetes mellitus"
          }
        ],
        "text": "Risiko Neuropati Diabetik"
      },
      "probabilityDecimal": 0.3,
      "whenRange": {
        "low": {
          "value": 5,
          "unit": "years",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        },
        "high": {
          "value": 10,
          "unit": "years",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        }
      },
      "rationale": "HbA1c tinggi (8.5%) meningkatkan risiko komplikasi neuropati dalam 5-10 tahun"
    },
    {
      "outcome": {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "230572002",
            "display": "Retinopathy due to diabetes mellitus"
          }
        ],
        "text": "Risiko Retinopati Diabetik"
      },
      "probabilityDecimal": 0.25,
      "whenRange": {
        "low": {
          "value": 5,
          "unit": "years",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        }
      }
    }
  ],
  "mitigation": "Kontrol gula darah ketat dengan target HbA1c <7%, screening retinopati rutin setiap tahun, perawatan kaki yang baik",
  "note": [
    {
      "text": "Pasien perlu edukasi tentang pentingnya kontrol gula darah untuk mencegah komplikasi jangka panjang"
    }
  ]
}
```

---

**Dokumentasi Lengkap:** Total 23 contoh FHIR resource yang mencakup seluruh workflow pelayanan kesehatan dari registrasi hingga resume medis sesuai panduan SATU SEHAT Interoperabilitas.

**Last Updated:** 8 Februari 2026
