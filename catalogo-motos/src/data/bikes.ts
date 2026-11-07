import { Motorcycle, HomologationModel, CustomerInquiry } from '../types';

export const INITIAL_MOTORCYCLES: Motorcycle[] = [
  {
    id: 1,
    brand: 'Yamaha',
    brandSubtitle: 'Yamaha Racing · Hyper Naked Series',
    name: 'MT-09 SP',
    year: 2025,
    displacement: '890 cc',
    displacementSegment: '650-900 cc',
    status: 'disponible',
    statusLabel: 'Disponible',
    priceRawCop: 56900000,
    priceDocsCop: 59850000,
    monthlyFinanceCop: 1180000,
    chassis: 'Deltabox CF',
    power: '119 HP @ 10,000 RPM',
    torque: '93 Nm @ 7,000 RPM',
    brakes: 'Brembo Stylema Monobloc',
    suspension: 'Horquilla KYB Dorada DLC + Öhlins Trasero',
    weight: '189 kg',
    transmission: '6 Velocidades con Embrague Antirrebote Asistido A&S',
    emissions: 'Euro 5+ Homologada',
    consumption: '5.0 L / 100 km',
    acceleration: '0-100 km/h en 3.2 seg',
    description: 'Edición de élite SP con monoamortiguador Öhlins totalmente regulable con pomo remoto, horquilla KYB con recubrimiento DLC y sistema de llave inteligente Smart Key.',
    verifiedVin: 'VIN Verificado #APX-9821',
    badge: 'Disponible en Sala',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtW7PNXXLmSynnoTJt8UIAadOBYy4qtpoYHvS6yw4Pv_JFJqrsp3rU-VyhHycz82BPmS3PjQxoxP97t_PviuJfHjfTrxdpQ8uiwiSoqkNtZ--_EhA2UAy-7GE_AnHbIYoDy_TsCqsi6hEhvdkdVWXQ8MP0__5cWjrFNef6Tkwb6kzRKkUkKPCzFeTErFgKl67NRB0pAbfNgR6c0FPhhgHTRF1grliDSgPAvp9D0K6T0uAZunXrlwYX',
        title: '1. Lateral Dinámica'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9lk6sA7wToILheSnAhCfwnfVtg8OIKk9bpCLV5Ud6xf23NKNCTXgYtwaJPckSs7Oo6PaeWmluJ8cxlfFUXGLo2tZqCiFiFZu6gXjNYZuYjsCVyopZN8DOp6eD61UCPOEX9AdgjELm0-1F541B7GnF976UbhluS7vUg-cUy5ozxOsvSjYxPXiv-caeFvXL6lnWooyvnuxhyqST0sx7Eoi7jwEZTk4qkOxvUFNeyCsvqKcG5Jku4AS5',
        title: '2. Frontal 3/4 Óptica'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJX7T5JxbJuLZ4z9jCMKyV83hZFAcMliLFRWL53FdyZ6ttoQpRr1dqEIekcsyQOaiY0iXGtDAlwYTbb8tRgbHen8FDLLSUEFWmhS7qi83iEM0V-HYEdMcXjhcnSubZo8XMwBN0YtGTjxMdmoKoHsVs4cq-2Q0kDNmxrH4FAd1bU6v4YJmiG6gWWE5EbHd-PlU0mhP8peAOTdfZzIyi8z2ypy2cAnBtdDVz1tulDIHci27JSyfZBL6V',
        title: '3. Cockpit TFT 5”'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXdJX7i2R6lmEO7n5qGZff9bHc_6Fdh8M6k-YF2ObuDC6J7XcGISt_jTABZe04ivMn_ShcrkRlEmICSJjcoGm_SmjOosZ-v4vnCUqoG9kmX1QH7fGzWgGZvPbdMnopnlnQlrpklwkcm3JiD5FxKxGs4e9cC1B8NFKJbXAeHWvbfTp4bJivBHXPqwnD8jVhKI__lrmEeOPJwDBDaOBBuDO4DW9Q1lRpGAkQkvC8RZnuetaRhdmaNJIP',
        title: '4. Frenos Brembo Stylema'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6gasbUfgqYpmnM4jxMuPazVcfyx_8OQ-8-ATZjaF1ET5vdY075JR1FegRk1ndYJQnv0VPRDWu3au59WUv65hzvGa8wlTgMnrkvqBBRhVOOJSJeIb5xiXvBovlGCnZ9cpnyFjHv6vHRe4PdPDR7BsbFzvKuNxDQceyFPsF8vNO6X8yN4j35byu0Wsc3D5_j7XIlrvLLJ_gNKKPB5jyKILug3a942Y9S46Xa8vryT26QGmuZq4Rr2AY',
        title: '5. Escape & Colín LED'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCR6LWLgqvmlJUozpQ2ifBttrowu7sYup_IjEeQ_4gKb0Ia1kp44OJ8F3R5PPWHvf0Xu8qpHrFXwGwXfQKwPywKUWWt5DLSuk3qFkG7eCXtsnUmzYAdOOzV29o3NnLWPbyRVRpzjsxaKSYOfc0eQiNVtVTjtteGAZuxJe6ejcrQcWKeifuk5fUBlCednNTcGGGE4_jYzOIgqHJEHFmRXUTAVrRF-8CjVCC4qgCo0afpRCDU1XkfMq6',
        title: '6. Óptica Nocturna'
      }
    ],
    colors: [
      {
        id: 'c1',
        name: 'Icon Performance',
        code: '#IP-2025-SP',
        stock: 3,
        transitStock: 1,
        status: 'disponible',
        statusText: 'Disponible (3 unid)',
        colorHex: '#0891b2',
        secondaryHex: '#94a3b8'
      },
      {
        id: 'c2',
        name: 'Tech Black',
        code: '#TB-2025-K',
        stock: 0,
        transitStock: 2,
        status: 'espera',
        statusText: 'En Tránsito (12 d)',
        colorHex: '#0f172a',
        secondaryHex: '#334155'
      },
      {
        id: 'c3',
        name: 'Cyan Storm',
        code: '#CS-2025-CY',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotada / Reserva',
        colorHex: '#38bdf8',
        secondaryHex: '#64748b'
      }
    ],
    extras: [
      'Quickshifter Bidireccional de 3ª generación',
      'Pantalla TFT 5” con Garmin StreetCross y conectividad Y-Connect',
      'Suspensión KYB Dorada DLC + Öhlins trasero ajustable con pomo remoto',
      '4 Modos Estándar + 2 Modos Track Custom para pista',
      'Control de Crucero Electrónico (Cruise Control)',
      'IMU de 6 ejes derivada de la Yamaha YZF-R1'
    ]
  },
  {
    id: 2,
    brand: 'Kawasaki',
    brandSubtitle: 'Kawasaki Supersport',
    name: 'Ninja ZX-6R',
    year: 2025,
    displacement: '636 cc',
    displacementSegment: '650-900 cc',
    status: 'espera',
    statusLabel: 'En Espera (15 Días)',
    priceRawCop: 51800000,
    priceDocsCop: 54900000,
    monthlyFinanceCop: 1060000,
    chassis: 'Perimetral de Aluminio Prensado',
    power: '129 HP @ 13,000 RPM',
    torque: '69 Nm @ 10,800 RPM',
    brakes: 'Nissin Monobloc 4 Pistones',
    suspension: 'Showa SFF-BP Invertida 41 mm',
    weight: '198 kg',
    transmission: '6 Velocidades con KQS y Embrague Asistido FCC',
    emissions: 'Euro 5+ Homologada',
    consumption: '5.5 L / 100 km',
    acceleration: '0-100 km/h en 3.1 seg',
    description: 'El legendario motor tetracilíndrico de 636cc optimizado para régimen medio y alto con tomas Ram-Air, modos de conducción integrados (Sport/Road/Rain/Rider) y cambio rápido KQS.',
    verifiedVin: 'Lote en Tránsito #A402',
    badge: 'Preventa Prioritaria',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy7PAiNzmTzfSR7pwSe6OyJbtg17bp3EcHMlHNPmpm9F0GR4GQz4000tGCIxR3sXHKBVEA3MzPG_-6LV6_bfEi2tqeUdQEPLLn1BCJHmlbSDA_VPaM6N8QcnDNqv5iv4gzLj4amAFDKZOw7jaWfdWHOhtBGAkKM4tOFN6Oy_JeTPnPe8KWkL-vye5bfp2uD_6HZKmJ4mgKr4fPWWojmWEMnUjVaNrD95ZyBTx7oTDrL0bjukXb-7qU',
        title: '1. Lateral 3/4 Pista'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHAM60gljSpB-mdmSc76jxkvT4hi5g6pe16rAAKmtGFqGjx-5Bh-JMsA0Tns2L6r7QfYtj_u0sJyqUhwH7Ui9H97kQq66BaYKL4oqZpsjk6qpx_zo6JoIjAylvTqlUZtMAU_4YdWE-8TwZH0ylOCFqNj2pxoxZLXXxjz5paLi8HNx1JjnCayCfq620hb4-XcvvD6vb6xSR-G3Ti-XOyVmg9vVpu30Uo-R4y3tkGXTd3li86OWWYRtd',
        title: '2. Aerodinámica KRT'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE53_dwqrv_DR-ekPgOqo_kRrvtOJWyTYUEjSzCGPpC1MnH5Y1ZHipxGiufvdnRcLu0ObyPq53_Hy7v15ob559dypPyWqkaHGMr0jmKr8MjmRfPlgQzaOIPIyNGKF7wGnVKduyPLSqL8ywe-1GEnYoczVz-khdosqmNC3L6m-fibKnzGwCqrP6KFr2X6vZQ0UlbIt5sDcSNAn9UzdrNhKMXhgdZXbF4JmpckMPS18eNx8OdiY8OEP0',
        title: '3. Frontal Ram-Air'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2XiJgHACjgosTuB2zvx-CyO77mq0DBvI4t1xp7YQvvDHF6-JTUCnrPLkp5tCHr5SkBFho-benf1jN4w0rwSlRrWAnHs5o76t4Pt5BjmaWbEpdRhErsRjBWp_MtQSIl12Lka84PHths679bwxHZJyB66z7x-uPbwWzyimTr76Y7tUwwgxWonScqBdsnWjWKq4EoJF4hfQjPpIM_-OezBhhsk7Hxz4jszd_HELfebIvsjShUsPn7NVb',
        title: '4. Cockpit TFT 4.3”'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXhUf3VUb_atvYg3NLEjv9W6j_4Rhwqwnzhp5MBws1YmT-T4unUf0-8yjNsIqCClBmtUHkQxR2oMVRn_93FCGEQckMqDP3sS29pwW67sB8P8MMmhJUAfAGup0voTvC7uiVHtMQV9To_ojozDCPtjVj7V6tMYpfXQSclr1z6q8s5xG32vExqc39ih4NEqxM3PFk6zfn42kpd6zvtv4MhIwCgio9eP_cDeM0KocF04ZoCSckYkC62dz6',
        title: '5. Frenos Doble Disco'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlnSGG6QGaCB8odNbb32xTA4tr94DLF091NFKo8sSWCjy3WXJOuK10Rytz7UQLmuXwkPvBVPyrzpqx3B1eZAxBeQPG8yOZBzgupk4sqzmGLpJxyqXc2iz0TYHEEMPV-l0OOxVi0-SAf2TqhOfUb1fTHhYyDf9eTuuytP1UMhUfK1mDdj2CmsKgnvHVODF50Np8sLKngAuhD7GcwvQPZX9yHZ_y0AKyohAl_K-WIhnEgI8f6D8CUx65',
        title: '6. Escape Deportivo'
      }
    ],
    colors: [
      {
        id: 'c4',
        name: 'Lime Green KRT',
        code: '#LG-636-KRT',
        stock: 0,
        transitStock: 2,
        status: 'espera',
        statusText: 'En Espera (2 unid)',
        colorHex: '#10b981',
        secondaryHex: '#0f172a'
      },
      {
        id: 'c5',
        name: 'Metallic Diablo Black',
        code: '#DB-990-M',
        stock: 1,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Disponible (1 unid)',
        colorHex: '#18181b',
        secondaryHex: '#52525b'
      },
      {
        id: 'c6',
        name: 'Pearl Robotic White',
        code: '#PW-401-R',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado',
        colorHex: '#e2e8f0',
        secondaryHex: '#0284c7'
      }
    ],
    extras: [
      'Kawasaki Quick Shifter (KQS) ascendente',
      'Control de tracción KTRC de 3 modos seleccionables',
      'Modos de potencia Full / Low ajustables en marcha',
      'Pantalla TFT color 4.3” con conectividad Bluetooth Rideology',
      'Horquilla Showa SFF-BP (Separate Function Fork Big Piston)',
      'Tomas frontales Ram-Air de inducción directa'
    ]
  },
  {
    id: 3,
    brand: 'BMW',
    brandSubtitle: 'BMW Motorrad Motorsport',
    name: 'S1000RR M',
    year: 2025,
    displacement: '999 cc',
    displacementSegment: '1000 cc+',
    status: 'disponible',
    statusLabel: 'Disponible',
    priceRawCop: 98500000,
    priceDocsCop: 102900000,
    monthlyFinanceCop: 1910000,
    chassis: 'Bridge Frame de Aluminio Fundido',
    power: '210 HP @ 13,750 RPM',
    torque: '113 Nm @ 11,000 RPM',
    brakes: 'M Brakes Radiales 4 Pistones ABS Pro',
    suspension: 'Dynamic Damping Control (DDC) Electrónico',
    weight: '193 kg',
    transmission: '6 Velocidades con Shift Assistant Pro',
    emissions: 'Euro 5+ Homologada',
    consumption: '6.4 L / 100 km',
    acceleration: '0-100 km/h en 2.9 seg',
    description: 'Superbike de circuito homologada para calle. Incluye tecnología ShiftCam de distribución variable, alerones aerodinámicos M (downforce 17.1 kg) y llantas de fibra de carbono.',
    verifiedVin: 'VIN Verificado #BM-9921',
    badge: 'Entrega Inmediata',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcOQ-xBD7b58bEx5sbm_PlonqZ3J3jQxapKN6tLqgDKVn0j0yTklpk7yfTrCpwRKNWekPXB4bfywyuzTL1l28NrSTB9re2kh0Y3VgqENPGJ0loIXlKj3ee_WZErm_KcXwNvyeXDuRpLHd9HZsmvbkc0_AfRwFPQZl2THs9VF_bw2EMvnNkIz-qvg89DXmYTHahE__vGZiklrAF00ey_-l9YnlaTUNDQi4et4pNutW545nLIqiG9eZZ',
        title: '1. M Winglets Frontal'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0IBBZSLMLM2LHt_rnZiPLGfvFIsSRCa5BZtMN94qSyFvc82L-zJTOeOgC51AMGhU7UIxCn-V8McM7o7Nhh1wppUIqDxZnIjWq91FXB8N-MjGY53m4D0pgjcW2A8bN4CVXJSctC_COz_-WIuf5OS_CbsLrNcPI_lfH3N3kEjJW-qRxw_vGHm5mbrWuIVb91GncRrEB-vTpwXoYaoTkqh6GM3W1Eoj_NpC845vUX1CM_qR0yO4g27bt',
        title: '2. Aerodinámica M'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTF8x6dxBcyqMSPfcb4EDwOBNKa-O0XVxUM6ZzW7W2NYZvAjgpzjZCP9ua851E0ZJHlONRkm5rKRjomd0MSKL1jV6xu2f28ZsI4ypEj_9aJbMybHIw7t2x2O7yuLGWKEIMp63Cyzs0GXftkatWS0l7OMHD1UvrZ1qkM0xrNXk33bCPrhapNHEtBj-eupCKc8KQuDjTCz5amzfpDaXj8OqRuV5eOVwRz98dZo9aqq_8MUql51YvqCOQ',
        title: '3. Llantas M Carbono'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoFi5ezr3kM-hAKksT5T5LReKu8rTz22JwDpCttGTy0gpYSRssywMySXhX2TzCuiXqJ-AXoHWljsqHOuh1StWn4GPoot85LGIPzaNxYooW0oCRZpZjMSFF5tcnyr4qBrEEH3gFiCzDjDk_4jF6g1NZuW9ruof0KJolF0SCpxRdBOx3_g0a227bybqEc1MFUszPtX4snQ60iK5lEJc6ecT_7lORRq8fOxMoZwLxHSxrvHNqq1A5oQQS',
        title: '4. Cockpit M Telemetría'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZWa2SP2RNtpSZo5WN5ij9ri1ji4TEws-xwUq8BdlThOv5pxwkFcODfiQGcp8qUsTMA5_legzv9ubWcJn5GrM-bSzGM0OFyFVJYeNzfZ4DmZZOdxMGdFtNsVMhDC70-9011ob_nHPXW38rMwZh6npc-8eAhoI2VNeM5h_eBfLlqYwfsPn3ZLvtWyR8QJG-fbv3hxdFgJKFR5FlPb1Bcs3InHnGqRZ9Qx32b6BN6jXVW6HMTGnq4Fk_',
        title: '5. Frenos M Racing Azules'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3jMaZi1Ig8D-oQNa0vMx2gDPhZR_CZprZDWzGVGySl8EQoQL4sDnUrQw9xPAeMIK6HI2Bov4DjWtkO9-eGB6PYmI5XXED-vfNE8pKfQRDwLvT6VT8qbcCwOfzheUxN1M56bC9R-nzeqsEuplQC5ynC0wcgFRkiYeZKGlH_O4BhfDYeoDCy-s8Co4FwsiI1LwJ0_J_Zau8dRmoDHQFlJTar6HXBKyvf4PT33MB-D6I_6jEOgpBs6ld',
        title: '6. Escape Akrapovič'
      }
    ],
    colors: [
      {
        id: 'c7',
        name: 'M Motorsport Tricolor',
        code: '#MM-1000-W',
        stock: 2,
        transitStock: 1,
        status: 'disponible',
        statusText: 'Disponible (2 unid)',
        colorHex: '#ffffff',
        secondaryHex: '#2563eb'
      },
      {
        id: 'c8',
        name: 'Black Storm Metallic',
        code: '#BS-991-K',
        stock: 0,
        transitStock: 1,
        status: 'espera',
        statusText: 'En Espera (1 unid)',
        colorHex: '#09090b',
        secondaryHex: '#27272a'
      },
      {
        id: 'c9',
        name: 'Racing Red',
        code: '#RR-880-R',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado',
        colorHex: '#dc2626',
        secondaryHex: '#ffffff'
      }
    ],
    extras: [
      'M Winglets aerodinámicos de carbono (17.1 kg downforce a 300 km/h)',
      'ShiftCam con distribución variable de apertura de válvulas',
      'Llantas forjadas M de fibra de carbono ultraligeras',
      'Quickshifter Shift Assistant Pro bidireccional',
      'Pantalla 6.5” con telemetría de ángulo de inclinación y vuelta rápida',
      'Launch Control y Pit Lane Limiter de serie'
    ]
  },
  {
    id: 4,
    brand: 'Ducati',
    brandSubtitle: 'Ducati Borgo Panigale',
    name: 'Monster Plus',
    year: 2024,
    displacement: '937 cc',
    displacementSegment: '650-900 cc',
    status: 'revision',
    statusLabel: 'En Revisión Técnica',
    priceRawCop: 53900000,
    priceDocsCop: 57400000,
    monthlyFinanceCop: 1120000,
    chassis: 'Front Frame de Aluminio Monocasco',
    power: '111 HP @ 9,250 RPM',
    torque: '93 Nm @ 6,500 RPM',
    brakes: 'Brembo M4.32 ABS Cornering',
    suspension: 'Horquilla Invertida 43 mm + Monoamortiguador Pro-Link',
    weight: '166 kg',
    transmission: '6 Velocidades con Ducati Quick Shift (DQS) Evo',
    emissions: 'Euro 5 Homologada',
    consumption: '5.2 L / 100 km',
    acceleration: '0-100 km/h en 3.4 seg',
    description: 'Unidad en proceso de calibración y certificación de fábrica (PDI 72 puntos). Equipada con cúpula aerodinámica y tapa de colín monoplaza de serie.',
    verifiedVin: 'Inspección PDI 85%',
    badge: 'Fase Telemetría',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjRFOtIsObbwRtC9JhsRsDwN2Dqm6347FWaOpXw3WwWkQpxwwK2evj4WmkwOqJmJOblVUq_9aPbsG4-Dunoxi92renZB8iFe1S6HQH3hLWF1-4a4C1tqG0zPbr1y_9aYlVg4329swX0IAN8d9ogjs1L49bCw8uFR7W1WT_vIIUGbypGwAY1Wu3XhEoSFzTEi0qmpJavy0aMtmYG8hhLoqQTdDVa2YCyDSM12_o8Ks_BhpTHml4o4j6',
        title: '1. Banco de Calibración'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXi9jf0VHhcZpGuHfQleshhYdp4c4OOQtW9iF7lMTSTSp7v5rZvOMeBdogUI5NFHWaw0EYsGcZz3efpM0ksuRj-FGepX5MZozurhfZIk6OggxkFJmaKpn5tkK3F0FfPluV4yuFbQ1NiHA0iCMbgWBdJHoQ7ZYh1Kv0m_qLKt1dYhpl75onccHpAsCYBFAWC1Rgzd6U-UQ-aZPDC6XDy4fZywT60ZAc4EneoQfZpvWB5LxkGflixVFW',
        title: '2. Diagnóstico Electrónico'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrcJb3nQ1vG0nw-NcnRX4mJ13VV86AnfkYS0JA6O5JzqiJpwqRpz8SFbVniu4k8inxiPEvU4xiBF4AjadvbD6a45sraNlYQLgO-wQLAYSfSC8SbZAeLi6N1vSGpPhSBeNN9Gv8Hbkp9BsXrv1QmGXix619SZTxdTg3ULOB5-uDoJo-Zaj3GRp0RMESbs1AKMNBVYv5P3J6LWRzBSQ7qZArQBc323iCiogXbcisZ6JUE5GM74hHNmiz',
        title: '3. Motor Testastretta 11°'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTJ87fLW9DItvrNLLb8TZ1Xx0vPWloI4U_GOfOhLCO2Yq-k-5-kyAi8alxK7p9aBm6wzHzIkwjLF6SisTW7Nh9B9m0Jeox3V0r1_j7OxA8TL3udtICXOnFIx-Sj9Z6onEc91LVP3pmmkGDt4VwtbS2MRbuIrz9I1YBapUhWa7zrjFx5aRATvpa_VKiKkY0Pz_m_1OABeZNIn89E3EHatQIJPfkZJGQR7KRgElfyJzbU2uUtgdeFk5V',
        title: '4. Cockpit TFT 4.3”'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1AGd_rG7Nyhaux7UqPKK6TecEEruqL3F9GbzItbG5n2_N_tapPBuDv6THWJrwp-aIdGtO-RkXqZyVHzjOUkiEoCw2IE1CgXhc5UWSCb5PaholzJ1ZnzIXFhy2mf14nvU8ijb4A5QnpdYWYwbd774zAkdxppQt26uO3bvrVgmQosqEqBwqI6mpigMVpeGVgg_lrvOGyfINvV2LeAfggsni9cMvs-b_EykNyGbTE0kSwxD7GVMsIV-a',
        title: '5. Frenos Brembo Radiales'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBGqei1_WX2p-hL7sV3YV3LB_CZm9t_5_Kngb-kaCGV4vqN9W7AFIj8Co7TehJs-Aclu6sigw0ZSWZhUTCQrc1ODNtoY6mbrZTeAM9h8S8vc07KHegsVyZ7NmEI2ed9UzDnkFplZBDmiT_sK8goqQSHFqGIOz7Q6j-Ah684Voj-63_Jr5YRbDxze0f6rWRfUXa2rhZTH9-7u_5ZiSDdoBNdVYUnUKDKZ3FrunTZ1bY4rZ3kqI_ZkxJ',
        title: '6. Front Frame Monocasco'
      }
    ],
    colors: [
      {
        id: 'c10',
        name: 'Aviator Grey',
        code: '#AG-937-D',
        stock: 0,
        transitStock: 1,
        status: 'revision',
        statusText: 'En Revisión (PDI 85%)',
        colorHex: '#64748b',
        secondaryHex: '#ef4444'
      },
      {
        id: 'c11',
        name: 'Ducati Red',
        code: '#DR-937-R',
        stock: 1,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Próxima Entrega',
        colorHex: '#b91c1c',
        secondaryHex: '#0f172a'
      },
      {
        id: 'c12',
        name: 'Dark Stealth',
        code: '#DS-937-B',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado',
        colorHex: '#18181b',
        secondaryHex: '#3f3f46'
      }
    ],
    extras: [
      'Ducati Quick Shift (DQS) up/down evo',
      'Ducati Traction Control (DTC) 8 niveles',
      'Chasís Front Frame de aluminio inspirado en Panigale',
      'Pantalla TFT a color de 4.3” con interfaz deportiva',
      'Óptica Full LED con intermitentes dinámicos swiping',
      'Cúpula aerodinámica y tapa colín monoplaza de serie'
    ]
  },
  {
    id: 5,
    brand: 'Honda',
    brandSubtitle: 'Honda Racing Corporation',
    name: 'CBR650R E-Clutch',
    year: 2024,
    displacement: '649 cc',
    displacementSegment: '650-900 cc',
    status: 'agotada',
    statusLabel: 'Agotado (Tránsito)',
    priceRawCop: 41500000,
    priceDocsCop: 44900000,
    monthlyFinanceCop: 840000,
    chassis: 'Diamante en Tubo de Acero',
    power: '95 HP @ 12,000 RPM',
    torque: '63 Nm @ 9,500 RPM',
    brakes: 'Nissin 4 Pistones Anclaje Radial',
    suspension: 'Showa SFF-BP Invertida 41 mm',
    weight: '209 kg',
    transmission: '6 Velocidades con Sistema Electrónico E-Clutch',
    emissions: 'Euro 5 Homologada',
    consumption: '4.9 L / 100 km',
    acceleration: '0-100 km/h en 3.6 seg',
    description: 'Revolucionario sistema Honda E-Clutch que permite arrancar, cambiar y detenerse sin accionar la maneta de embrague. Motor de 4 cilindros en línea de alto régimen.',
    verifiedVin: 'Lote 03/2025 en Producción',
    badge: '12 Solicitudes en Cola',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqqeTDbFwvMim-uCabJT3GEWVAgp6Gf3HQbw0nAF3umrKNddA90q7nXFKTJElzpl1mPn1SWd89770sxOmu2Vz4S_YJlzixB4v8rykXZfMX8Qc-XXRl0aTtQK6tuWD16ihh0nJU_InsKvpVlPih6BGCfRK5E_abDKar4vtRsHaNveX6ifz-Fmd4ICiFiFUiM36DxtWjC5n3UxgFtEPT3V6UBDa2k3vsKch4K9SQ5RpfArRe4x9xcM3u',
        title: '1. CBR E-Clutch Frontal'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjBxpViW_ILk3IB_Lq0zXz4oo2tkrUqfNOPBW9zTZbsLcLEv0yjRh7sfp9fTQqB2BVkSDM3WRHH3Y8iuAji3Hxek_q0y_j3yZbejDNBh_65RlMiwECXqAH3e2Xwdd61EqO5WdBd2Mo3ffJfR_gKlqoiLFoASUa1TrnLx22nKie6EjLlNfDk2L2_6c8aeiOsNrCnOOlp_Z9B974GiGmJcppKrc25ye7VkFmenQS2h5NHzWvhke1s7_5',
        title: '2. Carenado Aerodinámico'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1VPyFC6NCpCEhjFjbnj3LG4qfIfiI0rSHRJsREPFGj_wwfdtu4h2BYsAkujQnffTJxYCHJLCKlLUEctdk-zf5Zeluh12jUExfBj-m8eRkrK8zWyahtHrKqKFfoxCLWryHzXc38v_ZwAgedV0DroIMeo-sBtVtm7UiToMui9GLzV4ZjQ0exSLG7kDqoAUD1_orkL1_PG8tAEcMolMQZAZLQE4pKAWtoRHd92xp0fCYst9J9c53qGA1',
        title: '3. Motor Tetracilíndrico'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd7sFNesDqjCqg-bDL3nmSrJ8j6GsgbLSMhuhio3Ecg69XDQ1CpjZs4KpTnUZPs13fFDX5_waN1jkpin1gwvdd9VrUZl-pqiftWWlvdEQU4mjwLmkWJLnmz6gobiApCtYJzAZ_ej6u03C85GwEATEa_a2zBt_NH4iZrnV6-87qAzvDqXPkWrTuVzqsYf8LRlDNuZhc2ill6Tp5vGDiXCu0Q-ApH8EeiCApdRewoM5RvoNTuYTu6jKQ',
        title: '4. Cockpit TFT RoadSync'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjxK56SNCHwP6xtviVmmXyxTy9Jd5KOYNijhpm9L-fNMpeR4bB2goaJ6A_-rfuN32pWoJEhMiAYaz4fZ6IRekf5k3sEIpuM7N00AyCXZMIUuG9x2OForTCyuD2FjSD6bMcGKeDCTBiZLNrCQGeYhgg7SWRwlLB9pRSsMfc5n5o6F6SfaXBUTpiELHt0Ucv7XM-TTwBQJYgNqi0sAbQ2rTTMDFBQuFUXP8fTyjqSct_iZ-ReclppbGF',
        title: '5. Frenos Radiales Nissin'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM-fl9zqejJxKTDjnHarc9_ZyaKfILAKhsOwZ0eCjr0W_JB9P-hbd8D7Xis2kaviEjFeHwm7Xg2lCKEwDcE-7_rQSdG4KijjDfhjXjjtxTeB2p74dstVyiVVCrHw0-Syt6o7gHMMgtic8GGixxwPAIXamtZNc6EAFBmZO_Y9y6yDPlbC6b-y3_fOp_gY3YSohI1ambSYpZOWVCyCKxASC7S6Zkzlub6DCBFGYOnK_8nJ8tgS5KMZKE',
        title: '6. Suspensión Showa SFF-BP'
      }
    ],
    colors: [
      {
        id: 'c13',
        name: 'Grand Prix Red',
        code: '#GP-650-R',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado (Lote Marzo)',
        colorHex: '#dc2626',
        secondaryHex: '#1e3a8a'
      },
      {
        id: 'c14',
        name: 'Matt Gunpowder Black',
        code: '#GB-650-K',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado',
        colorHex: '#18181b',
        secondaryHex: '#52525b'
      }
    ],
    extras: [
      'Sistema pionero Honda E-Clutch sin maneta de embrague',
      'Motor 4 cilindros en línea de alto régimen (12.000 rpm)',
      'Embrague antirrebote convencional de respaldo seleccionable',
      'Pantalla TFT 5” con conectividad Honda RoadSync',
      'Horquilla invertida Showa SFF-BP de pistón grande',
      'Iluminación Twin LED afilada con intermitentes de emergencia'
    ]
  },
  {
    id: 6,
    brand: 'KTM',
    brandSubtitle: 'KTM Ready To Race',
    name: '890 Duke R',
    year: 2024,
    displacement: '889 cc',
    displacementSegment: '650-900 cc',
    status: 'disponible',
    statusLabel: 'Disponible',
    priceRawCop: 52900000,
    priceDocsCop: 56300000,
    monthlyFinanceCop: 1080000,
    chassis: 'Tubular al Cromo-Molibdeno',
    power: '121 HP @ 9,250 RPM',
    torque: '99 Nm @ 7,750 RPM',
    brakes: 'Brembo Stylema Radiales',
    suspension: 'WP APEX Pro Totalmente Regulable',
    weight: '166 kg',
    transmission: '6 Velocidades con Quickshifter+ y Embrague PASC',
    emissions: 'Euro 5 Homologada',
    consumption: '4.8 L / 100 km',
    acceleration: '0-100 km/h en 3.1 seg',
    description: 'Apodada "The Super Scalpel". Geometría de carreras más agresiva, suspensiones WP APEX Pro ajustables y modo de circuito "Track Mode" con launch control y anti-wheelie regulable.',
    verifiedVin: 'VIN Verificado #KT-8890',
    badge: 'Lista para Despacho',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCk-9GY65n7jsby1K6BpqxvuncFrItp1eiZ0BK_jwAZZQKfGF_-uNwjgc1f_IuQvkkswKb9uYRcszgz22GwILzUNbmy4iJ_GHKI1A6SPoOdu54YTLx4It4uvx6KdCAS8Q7B8tXw4NU7Rx2dv8-wgGZvyKsBo4HqHQ4lQ4bCeDnhfo51YgVCxN1r8lvBoRb_mVUNtNuyzrMBaXziPceYeFBVfrFSCK1yVd12Biekpx0MOdSgiH_1bn7',
        title: '1. Chasis Tubular Trellis'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChIaUvoYpzI2H8L5MPYNoGVjwOSDj18C0ivj5Mymof1Ym4i9FYV5DeOZ8Y2ziXBDuiDSlI--6sB334nY7WnSFbkQzmi06ACt7eEfM5z8dz3szNp53Zq8JlT7T6vzNPtXuYvrNrZcIksmM0TTApGcdNHAPSIz7-4gH0Alr-Anb-jcT2CYnj-n1WCf9-4rBhPigmH_E7FH0oxkVSqEHvCzNrgolVx5Cq2sROEAt5q9liojaEGqYirUqr',
        title: '2. Chasís Trellis Naranja'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTiqse7gm64wwbwuCJOTUYC-khUo3-QH67DLP_8kK0xmO2aVDhJoZlwNe4n-eLbXeRcJKTEJh9kGJ-wEqIL5LgUsANZh5kuO58CrR9ifMlp75A3upaXWaQXp7I_c9iXyqDt9tVnvgar71us6AaMcTmz8F4c_01SDSdgo5DfsvGYYN1QZ9nqYZcYf14XJ5tS_kqNNueismT02Y6rZWPXpE7wEUDag0f1iglKFSfLWuOVYH5ZX6PbHF6',
        title: '3. Suspensión WP APEX'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPDgAIaA9pnO13RyXoIBHnhMjtYtahBlp3fOo7MH0zpiwgK261hNhlZfu09IS6eXtwiOOoIun9IuzfdPjZbBcnAxoQHNFuLAV4p9HoZYY3nIT8phj6j5Cjw22PWNqFlx4KsirT3WyBZnNVxZ5XiwePFT89HNi4aeJEqYow5KUugG2_4No_IjOv3E5VzFzoJ8YVPEzk5Bkmm9nDhx5nm5L_co3mb8Q76r7edHSFzcWAcfzkoM6dWZrz',
        title: '4. Cockpit Modo Track'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD61XiomC68U3gYbmqWYMXn8f7zVq5meMPPikR3fxPT3Zwh7ImtpS_cDG9va-v8WKPXZ73mWjJ82m2GSHh2MszU1tQoUPFKPMm4nhhw7_FC8zm23zf_9F4D1KTY5Xid29aewFBHuSLN09CC0I-078wOmUvBmno9UJzVsDBO8qI3QnEOyoqgqwy1O1Xs8npTp0iH6XNBQ0tGWuwM4ZePLw_XHxKnl30_M5NkKtYlgSMt_okV1boIoHsj',
        title: '5. Frenos Brembo Stylema'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyNknfVN1aJrB0VrqDPDOZOdS6Lz3LLKxtMW4EIpzGyk0JQ-yiHP7yaI96UhWXpv7BPmDyfoXqHmAyLGQkT0O6Mi04BsO8eq1FgC2Zjjdgd6rF8uqC4Y1CpPqAUrymC_lP-Qm5DvubAt5cYfs4zsqdvkAvSSGmySdV47wgu5e2HbbOuKnmAo5wApwyXYeB0BnpHZvqae2yfIBbE8_FMCqSE_sJI7x3pejJKIGWh2umU3Tqd4ogtXwJ',
        title: '6. Cola Monoplaza R'
      }
    ],
    colors: [
      {
        id: 'c15',
        name: 'R White / Orange',
        code: '#RW-890-OR',
        stock: 1,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Disponible (1 unid)',
        colorHex: '#f97316',
        secondaryHex: '#f8fafc'
      },
      {
        id: 'c16',
        name: 'Matte Black R',
        code: '#MB-890-K',
        stock: 0,
        transitStock: 0,
        status: 'agotada',
        statusText: 'Agotado',
        colorHex: '#18181b',
        secondaryHex: '#ea580c'
      }
    ],
    extras: [
      'Quickshifter+ bidireccional ultrasensible',
      'Modo de circuito "Track Mode" con Anti-wheelie regulable',
      'Suspensiones WP APEX Pro de cartucho abierto',
      'Chasís tubular de acero al cromo-molibdeno ultraliviano',
      'Embrague antirrebote PASC asistido por vacío',
      'Neumáticos Michelin Power Cup 2 de compuesto blando'
    ]
  },
  {
    id: 7,
    brand: 'Yamaha',
    brandSubtitle: 'Yamaha Motor Corp',
    name: 'MT-07 Pure',
    year: 2024,
    displacement: '689 cc',
    displacementSegment: '650-900 cc',
    status: 'revision',
    statusLabel: 'En Revisión',
    priceRawCop: 46500000,
    priceDocsCop: 49500000,
    monthlyFinanceCop: 780000,
    chassis: 'Diamante Tubular de Acero',
    power: '73.4 CV @ 8,750 RPM',
    torque: '67 Nm @ 6,500 RPM',
    brakes: 'Cornering ABS + Doble Disco Flotante 298 mm',
    suspension: 'Horquilla Telescópica 130 mm',
    weight: '184 kg',
    transmission: '6 velocidades con embrague asistido antirrebote A&S',
    emissions: 'Euro 5 Homologada',
    consumption: '4.2 L / 100 km',
    acceleration: '0-100 km/h en 3.8 seg',
    description: 'La Yamaha MT-07 2024 continúa dominando el segmento hyper-naked gracias a su elogiado motor crossplane CP2 de 689 cc homologado EU5. Cuenta con un diseño agresivo con doble entrada de aire winglet, faro frontal compacto full-LED, e instrumentación con pantalla TFT a color de 5 pulgadas vinculable mediante MyRide.',
    verifiedVin: 'Unidad #APX-709',
    badge: 'Taller PDI',
    slides: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuRdO5ANCV7A-UaKbNBA12RNlIOXQerefZzhGUE7lZJGcc4q5D1xNF7HxgnSYQak2PLzExsZ3wMJE5cApP9nOdTumghL-fCwdBaCNPMHbx_Qmk3tEnBjM3qol7fz_k_dHwG9YhJsn8BrpvTSlv_SjqFsU7-40M6UOfv6Ot_65edjNfLjTUkPCGC0YtGZjOBD-9haCeoiNn_Vs59FpeeWeMmCqQDtwRh_1OGDaYg6aPHy-RkCwBCTGy',
        title: '1. Portada Perfil Estudio'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Dc08fASqTnHWPwR3SROrZzhsW1KJAnIKJlUv6jT2rXqKRRPmEnVhXsuXMPW8UhlWktvA0KAskZ_wA1D2ho--Xj8XDomX2o9R5xh2cFDVJZMZBoyAbVw5LV2if62aNh0zLraWfAW0B1EJhcg4RDIGJbsWWj65SLMfmbYjN3wuXLsh-khRP7GpMrefX7I6OxWWX4jFRjWzCHEKZvonIExpFA3YinyTZ4QkrfqSxb_Z8YdoirCjIrDN',
        title: '2. Dash TFT 5 Pulgadas'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF4CfYUCowDN06Ssz6tM5tyI6fxV_v7ITuUwZbLt9MDCkI0zKY3vQdhzGVKzE7aUvWMyXwrY3bQsW6nCOR8X80BfVXCYqN00LaFwiA9uh3yOAaif03kG7sKMZDDyTwP4M4xObL-7vy_NzF1JpDE0DbEwmd_Iqe_8GwSRwHks1Hj452k3zyaEM-2dVqJH5Z-uvBkb_Dm--0RjgxvI22QwhOe0lz4DaL5dR_F0iAgzqxiSnOa1ygKpf1',
        title: '3. Frenos Doble Disco 298 mm'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN7W9jkAOJAy2EK3Y8OGvombIhHbSCtWjem1yTA6mloOo6kuJ11uiMVMj1veBU4CjDp56-aht6Q94yWsBGnM2HXx3Ron00CML9D7qW4HD-sBDOBA458guQ69hz0RmSuTXqkjGf53tuJvWcILXyF6w6H_m__rRYWJZdLA1QKn3hK1P_I3V0ElCBmCpyJY-VwKCh-KRk2zOktwMPtugo5JBH3zwJ7k95HuCbigFD2YTGVj9vtb2Jqb6Q',
        title: '4. Motor Bicilíndrico CP2'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCegLbtcBNYJjcHkBMm1gbNDF7VMB118w43GNMU2inBBf5JniqnUZrPNRGkTHBlgSaBjXn3Q0TXCnAqsyoID57DLh7ezSI-pJe03wW6gI58CwjFrEkOiKET36_2mo7QEbZw0-MEXKHetuXlEGQOsOAmZqlXqejZ8oWkFQYDiNK0OthGj6JqTc60EuZl1zGRJMuPiiM6nhryjF9OCZ48ees5clMznt7zlNTV4WSQGyiH83Q6NpevRceV',
        title: '5. Trasera 3/4 & Óptica'
      }
    ],
    colors: [
      {
        id: 'c17',
        name: 'Cyan Storm (Icon Blue / Fluorescent)',
        code: '#CS-2024-M',
        stock: 5,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Disponible (Inmediata)',
        colorHex: '#0ea5e9',
        secondaryHex: '#1e293b'
      },
      {
        id: 'c18',
        name: 'Tech Black (Obsidian Matt)',
        code: '#TB-9002-K',
        stock: 3,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Disponible (Inmediata)',
        colorHex: '#0f172a',
        secondaryHex: '#475569'
      },
      {
        id: 'c19',
        name: 'Icon Blue (Yamaha Factory Racing)',
        code: '#IB-3041-B',
        stock: 0,
        transitStock: 2,
        status: 'espera',
        statusText: 'En Espera (Preventa)',
        colorHex: '#2563eb',
        secondaryHex: '#94a3b8'
      }
    ],
    extras: [
      'Motor Crossplane CP2 bicilíndrico de 689 cc Euro 5',
      'Pantalla TFT a color de 5" con conectividad MyRide',
      'Freno delantero de doble disco lobulado de 298 mm',
      'Iluminación full LED compacta de haz directo',
      'Geometría ágil y ligera para ciudad y curvas reviradas'
    ]
  }
];

export const INITIAL_HOMOLOGATIONS: HomologationModel[] = [
  {
    id: 'h1',
    name: 'Yamaha MT-07',
    subtitle: '689cc · Generación 4.0 · 2024 vs 2025',
    status: 'selected',
    approved: false,
    outgoing: {
      year: 2024,
      badge: 'Liquidación',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1z0bJ3JqABNzu7HV84nde71pGWoNMLvqdHm1QfuYcraYEkxhM0SeS3ZllANipEPESn8mscCD5To21rTepWStYUQulvdYG04uMxWvcYzk-maVPTM887I9kuI5wjVt8EnRmFaryIPaHajZ0NdX3L24_zjCKvp396XVGJwkthYEUyS0anHmttO_pM6z3bs4yCKeIFo-4mkeN9YoQvmojHCUUmotOvR3_zj6jZ8DRen46ybdYrCEriyYM',
      display: 'Pantalla LCD invertida monocromática básica de alto contraste.',
      brakes: 'Pinzas estándar de 4 pistones y discos dobles de 298mm, ABS convencional de 2 canales.',
      electronics: 'Sin modos de manejo seleccionables, acelerador mecánico por guaya tradicional.',
      priceCop: '$ 46.500.000 COP',
      stockInfo: '2 unidades en bodega'
    },
    incoming: {
      year: 2025,
      badge: 'Por Homologar',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNlaIXlBAOVvvchCbNcSGNnpSX2dqgDXEwI_oM2WCFKn81GcHijqX2M0-1dG63HxwJS7J1m7qIMMEXVfuDQ7BOBAMxW-n0RH8ivQ47KCL3LpC49g_xkmt8tVzuyyx1mLduUMjLkWLmjVPldtG1PPvoaHQ7pGWRfSasj54XVNpM0C-1I7IlgSk00ATy-GpC_UNTpoecQBycNX41RDZrX8fZushh5UPGB-TYYergkYdwjy2DRPaPEK_2',
      display: 'Nueva pantalla TFT a color de 5 pulgadas con navegación integrada turn-by-turn y conectividad Bluetooth Y-Connect.',
      displayDiff: 'Mejora Detectada',
      brakes: 'Discos flotantes de mayor diámetro con pastillas sinterizadas de alto roce y unidad inercial IMU con Cornering ABS adaptativo.',
      brakesDiff: 'Cambio Detectado',
      electronics: 'Acelerador electrónico Y-CCT (Ride-by-Wire) con 3 modos de potencia D-Mode, embrague antirrebote A&S y control de tracción (TCS) desconectable.',
      electronicsDiff: 'Cambio Clave',
      priceCop: '$ 49.900.000 COP',
      priceGrowth: '+ 7.3% vs 2024',
      availability: 'Inmediata post-aprobación'
    },
    checklist: [
      {
        id: 'chk-1',
        title: 'Fotos oficiales de prensa cargadas',
        subtitle: 'Pack de prensa con vista 360°, ángulo 3/4 frontal, lateral y detalle del nuevo tablero TFT.',
        badge: '6/6 Vistas',
        badgeClass: 'bg-tertiary-container/20 text-tertiary',
        completed: true
      },
      {
        id: 'chk-2',
        title: 'Manual de servicio y emisiones Euro 5+',
        subtitle: 'Certificación de emisiones aprobada según normativa local y ficha de torque oficial.',
        badge: 'Validado',
        badgeClass: 'bg-tertiary-container/20 text-tertiary',
        completed: true
      },
      {
        id: 'chk-3',
        title: 'Confirmación de precios con y sin matrícula',
        subtitle: 'Falta desglosar SOAT, impuestos departamentales y liquidación de placas para el año fiscal 2025.',
        badge: 'Requerido',
        badgeClass: 'bg-error-container/40 text-error',
        completed: false
      },
      {
        id: 'chk-4',
        title: 'Asignación de stock de preventa inicial',
        subtitle: 'Configurar pasarela de abonos mínimos de $2.000.000 COP por reserva en el showroom online.',
        badge: '10 Cupos',
        badgeClass: 'bg-surface-variant text-on-surface-variant',
        completed: false
      }
    ]
  },
  {
    id: 'h2',
    name: 'Kawasaki Ninja ZX-6R',
    subtitle: '636cc · Facelift Euro 5+ · 2024 vs 2025',
    status: 'pending',
    approved: false,
    outgoing: {
      year: 2024,
      badge: 'Liquidación',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHAM60gljSpB-mdmSc76jxkvT4hi5g6pe16rAAKmtGFqGjx-5Bh-JMsA0Tns2L6r7QfYtj_u0sJyqUhwH7Ui9H97kQq66BaYKL4oqZpsjk6qpx_zo6JoIjAylvTqlUZtMAU_4YdWE-8TwZH0ylOCFqNj2pxoxZLXXxjz5paLi8HNx1JjnCayCfq620hb4-XcvvD6vb6xSR-G3Ti-XOyVmg9vVpu30Uo-R4y3tkGXTd3li86OWWYRtd',
      display: 'Tablero LCD análogo-digital semicompacta con indicador de cambio básico.',
      brakes: 'Pinzas dobles Nissin sin Cornering ABS de calibración inercial.',
      electronics: 'KTRC de 3 modos con acelerador convencional por cable de acero.',
      priceCop: '$ 48.900.000 COP',
      stockInfo: '1 unidad en bodega'
    },
    incoming: {
      year: 2025,
      badge: 'Por Homologar',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy7PAiNzmTzfSR7pwSe6OyJbtg17bp3EcHMlHNPmpm9F0GR4GQz4000tGCIxR3sXHKBVEA3MzPG_-6LV6_bfEi2tqeUdQEPLLn1BCJHmlbSDA_VPaM6N8QcnDNqv5iv4gzLj4amAFDKZOw7jaWfdWHOhtBGAkKM4tOFN6Oy_JeTPnPe8KWkL-vye5bfp2uD_6HZKmJ4mgKr4fPWWojmWEMnUjVaNrD95ZyBTx7oTDrL0bjukXb-7qU',
      display: 'Nueva instrumentación TFT a color de 4.3" con conectividad Rideology y modos de circuito.',
      displayDiff: 'Mejora Detectada',
      brakes: 'Pinzas radiales monobloc Nissin con discos lobulados de 310 mm y KIBS con IMU 5 ejes.',
      brakesDiff: 'Mejora Radical',
      electronics: 'Nuevos perfiles de potencia integrados Sport/Road/Rain/Rider con sensor de cambio rápido KQS.',
      electronicsDiff: 'Cambio Clave',
      priceCop: '$ 51.800.000 COP',
      priceGrowth: '+ 5.9% vs 2024',
      availability: '15 días (Lote en puerto)',
    },
    checklist: [
      {
        id: 'chk-5',
        title: 'Fotos oficiales y catálogo descargable',
        subtitle: 'Pack de fotos 4K y folleto de especificaciones técnicas para clientes.',
        badge: 'Validado',
        badgeClass: 'bg-tertiary-container/20 text-tertiary',
        completed: true
      },
      {
        id: 'chk-6',
        title: 'Homologación técnica ambiental DIAN / RUNT',
        subtitle: 'Certificación Euro 5+ radicada ante autoridades de transporte.',
        badge: 'Validado',
        badgeClass: 'bg-tertiary-container/20 text-tertiary',
        completed: true
      },
      {
        id: 'chk-7',
        title: 'Tarifario de garantía extendida Kawasaki Care',
        subtitle: 'Definir opciones de cobertura 2 y 3 años con taller autorizado.',
        badge: 'Validado',
        badgeClass: 'bg-tertiary-container/20 text-tertiary',
        completed: true
      },
      {
        id: 'chk-8',
        title: 'Habilitar cupos de preventa prioritarios',
        subtitle: 'Cupo para 8 apartados en línea con seña de $2.000.000 COP.',
        badge: 'Pendiente',
        badgeClass: 'bg-error-container/40 text-error',
        completed: false
      }
    ]
  }
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-101',
    bikeId: 1,
    bikeName: 'Yamaha MT-09 SP 2025',
    clientName: 'Alejandro Valdés',
    documentId: '1098472910',
    phone: '+34 622 910 442',
    email: 'alejandro.valdes@gmail.com',
    type: 'reserva',
    date: 'Hoy, 14:10',
    status: 'Validada',
    depositAmount: '$2.000.000 COP',
    city: 'Madrid / Showroom Central'
  },
  {
    id: 'INQ-102',
    bikeId: 3,
    bikeName: 'BMW S1000RR M 2025',
    clientName: 'Carlos Mendoza',
    documentId: '80241923',
    phone: '+34 689 312 800',
    email: 'carlos.mendoza@apexmail.com',
    type: 'testride',
    date: 'Hoy, 11:35',
    status: 'Agendada',
    preferredTime: 'Sábado 10:00 AM',
    city: 'Pabellón Trackside'
  },
  {
    id: 'INQ-103',
    bikeId: 2,
    bikeName: 'Kawasaki Ninja ZX-6R 2025',
    clientName: 'Mariana Ospina',
    documentId: '102394812',
    phone: '+34 655 421 990',
    email: 'mariana.ospina@icloud.com',
    type: 'reserva',
    date: 'Ayer, 18:20',
    status: 'Pendiente',
    depositAmount: '$2.000.000 COP',
    city: 'Showroom Online'
  },
  {
    id: 'INQ-104',
    bikeId: 4,
    bikeName: 'Ducati Monster Plus 2024',
    clientName: 'Diego Forlán',
    documentId: '98412891',
    phone: '+34 611 773 201',
    email: 'diego.forlan@motorsport.es',
    type: 'alerta',
    date: '21 Oct, 16:00',
    status: 'Pendiente',
    city: 'Taller PDI'
  }
];

export const APEX_DEALERSHIP_STATS = {
  totalMotos: 42,
  disponibles: 28,
  preventa: 8,
  agotadas: 4,
  enRevision: 2,
  reservasWeb: 15
};
