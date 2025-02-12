const sampleRequestBodies = {
  NID: [],

  DARS: [
    {
      tabName: "From NID",
      endpoints: [
        {
          endpointName: "Authentication",
          url: "http://172.16.13.52:30502/authenticate",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        },
        {
          endpointName: "Get Personal Info",
          url: "http://172.16.13.52:30502/getPersonalInfo",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    },
    {
      tabName: "From MFA",
      endpoints: [
        {
          endpointName: "Authenticate Power Of Attorney",
          url: "http://172.16.13.52:30502/authenticatePowerOfAttorney",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["MFA"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    }
  ],

  MOR: [
    {
      tabName: "From DARS",
      endpoints: [
        {
          endpointName: "Get TIN",
          url: "http://172.16.13.52:30502/getTIN",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        },
        {
          endpointName: "Process Trade License",
          url: "http://172.16.13.52:30502/processTradeLicense",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        }
      ]
    },
    {
      tabName: "From NID",
      endpoints: [
        {
          endpointName: "Authentication",
          url: "http://172.16.13.52:30502/authenticate",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        },
        {
          endpointName: "Get Personal Info",
          url: "http://172.16.13.52:30502/getPersonalInfo",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    }
  ],

  MOTRI: [
    {
      tabName: "From DARS",
      endpoints: [
        {
          endpointName: "Get TIN",
          url: "http://172.16.13.52:30502/getTIN",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        },
        {
          endpointName: "Process Trade License",
          url: "http://172.16.13.52:30502/processTradeLicense",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        }
      ]
    },
    {
      tabName: "From NID",
      endpoints: [
        {
          endpointName: "Authentication",
          url: "http://172.16.13.52:30502/authenticate",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        },
        {
          endpointName: "Get Personal Info",
          url: "http://172.16.13.52:30502/getPersonalInfo",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    },
    {
      tabName: "From MOR",
      endpoints: [
        {
          endpointName: "Get Tax Payer Data",
          url: "http://172.16.13.52:30502/getTaxpayerData",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["MOR"],
          providesTo: []
        },
        {
          endpointName: "Request TIN",
          url: "http://172.16.13.52:30502/requestTin",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["MOR"],
          providesTo: []
        }
      ]
    }
  ],

  // MOLS is a Consumer entity that consumes from several sources.
  MOLS: [
    {
      tabName: "From MOR",
      endpoints: [
        {
          endpointName: "Get Tax Payer Data",
          url: "http://172.16.13.52:30502/getTaxpayerData",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["MOR"],
          providesTo: []
        },
        {
          endpointName: "Request TIN",
          url: "http://172.16.13.52:30502/requestTin",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["MOR"],
          providesTo: []
        }
      ]
    },
    {
      tabName: "From MOTRI",
      endpoints: [
        {
          endpointName: "Register Trade Permit",
          url: "http://172.16.13.52:30502/registerTradePermit",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Consumer",
          consumesFrom: ["MOTRI"],
          providesTo: []
        }
      ]
    }
    // Additional tabs (e.g., "From DARS", "From EAES", "From NID") can be added here if needed.
  ],

  // MFA is a Consumer entity that consumes from DARS.
  MFA: [
    {
      tabName: "From DARS",
      endpoints: [
        {
          endpointName: "Get TIN",
          url: "http://172.16.13.52:30502/getTIN",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        },
        {
          endpointName: "Process Trade License",
          url: "http://172.16.13.52:30502/processTradeLicense",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        }
      ]
    }
  ],

  // EAES is a Hybrid entity that consumes from NID and DARS.
  EAES: [
    {
      tabName: "From NID",
      endpoints: [
        {
          endpointName: "Authentication",
          url: "http://172.16.13.52:30502/authenticate",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        },
        {
          endpointName: "Get Personal Info",
          url: "http://172.16.13.52:30502/getPersonalInfo",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    },
    {
      tabName: "From DARS",
      endpoints: [
        {
          endpointName: "Get TIN",
          url: "http://172.16.13.52:30502/getTIN",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        },
        {
          endpointName: "Process Trade License",
          url: "http://172.16.13.52:30502/processTradeLicense",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["DARS"],
          providesTo: ["MOLS"]
        }
      ]
    }
  ],

  // Immigration is a Consumer entity that consumes from NID.
  Immigration: [
    {
      tabName: "From NID",
      endpoints: [
        {
          endpointName: "Authentication",
          url: "http://172.16.13.52:30502/authenticate",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        },
        {
          endpointName: "Get Personal Info",
          url: "http://172.16.13.52:30502/getPersonalInfo",
          httpMethod: "GET",
          sampleBody: "{}",
          role: "Hybrid",
          consumesFrom: ["NID"],
          providesTo: ["MOTRI", "MOR"]
        }
      ]
    }
  ]
};

export default sampleRequestBodies;
