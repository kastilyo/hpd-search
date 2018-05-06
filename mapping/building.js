module.exports = {
  mapping: {
    building: {
      properties: {
        /** START OF FIELDS FROM HPD Open Data -  Housing New York Units by Building **/
        // Description: The Project ID is a unique numeric identifier assigned to each project by HPD.
        // Type: Plain Text
        projectId: {
          type: 'text'
        },
        // Description: The Project Name is the name assigned to the project by HPD. Note: Certain types of projects to assist homeowners or special populations are marked as “CONFIDENTIAL”.
        // Type: Plain Text
        projectName: {
          type: 'text'
        },
        // Description: The Project Start Date is the date of the project loan or agreement closing
        // Type: Date & Time
        projectStartedAt: {
          type: 'date'
        },
        // Description: The Project Completion Date is the date that the last building in the project was completed.If the project has not yet completed, then the field is blank.
        // Type: Date & Time
        projectCompletedAt: {
          type: 'date'
        },
        // Description: The House Number is the street number in the building’s address. E.g., the house number is ‘100’ in ‘100 Gold Street.’ Note: address information for Confidential projects are masked.
        // Type: Number
        houseNumber: {
          type: 'keyword'
        },
        // Description: The Street Name is the name of the street in the building’s address. E.g., the street name is ‘Gold Street’ in ‘100 Gold Street.’ Note: address information for Confidential projects are masked.
        // Type: Plain Text
        streetName: {
          type: 'text',
          // type: keyword
        },
        // Description: The Borough is the borough where the building is located.
        // Type: Plain Text
        borough: {
          type: 'keyword'
        },
        // Description: The Postcode is the postcode where the building is located.
        // Type: Number
        postalCode: {
          type: 'keyword'
        },
        // Description: The BBL (Borough, Block, and Lot) is a unique identifier for each tax lot in the City
        // Type: Number
        bbl: {
          type: 'keyword'
        },
        // Description: The BIN (Building Identification Number) is a unique identifier for each building in the City.
        // Type: Number
        bin: {
          type: 'keyword'
        },
        // Description: The Community Board field indicates the New York City Community District where the building is located.
        // Type: Number
        communityBoard: {
          type: 'keyword'
        },
        // Description: The Council District field indicates the New York City Council District where the building is located
        // Type: Number
        councilDistrict: {
          type: 'keyword'
        },
        // Description: The Census Tract field indicates the 2010 U.S. Census Tract where the building is located.
        // Type: Number
        censusTract: {
          type: 'keyword'
        },
        // Description: The Neighborhood Tabulation Area field indicates the New York City Neighborhood Tabulation Area where the building is located.
        // Type: Plain Text
        neighborhoodTabulationArea: {
          type: 'keyword'
        },
        // Description: The Latitude and Longitude specify the location of the property on the earth’s surface. The coordinates provided are an estimate of the location based on the street segment and address range
        // Type: Plain Text
        location: {
          type: 'geopoint'
        },
        // Description: The Latitude (Internal) and Longitude (Internal) specify the location of the property on the earth’s surface. The coordinates provided are of the internal centroid derived from the tax lot.
        // Type: Plain Text
        locationInternal: {
          type: 'geopoint'
        },
        // Description: The Building Completion Date is the date the building was completed. The field is blank if the building has not completed.
        // Type: Date & Time
        buildingCompletedAt: {
          type: 'date'
        },
        // Description: Reporting Construction Type indicates whether the building is categorized as ‘new construction’ or ‘preservation’ in Housing New York statistics. ‘New construction’ is where affordable housing units are created through the development of new buildings or down payment assistance enabling a new homeowner to access an affordable home. ‘Preservation’ is where existing buildings receive physical rehabilitation and/or financial operating assistance in exchange for affordability for existing and future tenants. Note that some preservation projects may not involve construction.
        // Type: Plain Text
        reportinConstructionType: {
          type: 'keyword'
        },
        // Description: The Extended Affordability Only field indicates whether the project is considered to be Extended Affordability. An extended affordability project involves no construction, but secures an extended or new regulatory agreement. All extended affordability projects have a ‘reporting construction type’ of ‘preservation.’
        // Type: Plain Text
        extendedAffordabilityOnly: {
          type: 'boolean'
          // type: 'text'
        },
        // Description: The Prevailing Wage Status field indicates whether the project is subject to prevailing wage requirements, such as Davis Bacon.
        // Type: Plain Text
        prevailingWageStatus: {
          type: 'boolean',
          // type: 'text'
        },
        // Description: Extremely Low Income Units are units with rents that are affordable to households earning 0 to 30% of the area median income (AMI).
        // Type: Number
        extremelyLowIncomeUnits: {
          type: 'integer'
        },
        // Description: Very Low Income Units are units with rents that are affordable to households earning 31 to 50% of the area median income (AMI).
        // Type: Number
        veryLowIncomeUnits: {
          type: 'integer'
        },
        // Description: Low Income Units are units with rents that are affordable to households earning 51 to 80% of the area median income (AMI).
        // Type: Number
        lowIncomeUnits: {
          type: 'integer'
        },
        // Description: Moderate Income Units are units with rents that are affordable to households earning 81 to 120% of the area median income (AMI).
        // Type: Number
        moderateIncomeUnits: {
          type: 'integer'
        },
        // Description: Middle Income Units Number Middle Income Units are units with rents that are affordable to households earning 121 to 165% of the area median income (AMI).
        // Type: Number
        middleIncomeUnits: {
          type: 'integer'
        },
        // Description: Other Units are units reserved for building superintendents.
        // Type: Number
        otherIncomeUnits: {
          type: 'integer'
        },
        // Description: Studio Units are units with 0-bedrooms.
        // Type: Number
        studioUnits: {
          type: 'integer'
        },
        // Description: 1-BR Units are units with 1-bedroom.
        // Type: Number
        oneBedroomUnits: {
          type: 'integer'
        },
        // Description: 2-BR Units are units with 2-bedrooms.
        // Type: Number
        twoBedroomUnits: {
          type: 'integer'
        },
        // Description: 3-BR Units are units with 3-bedrooms.
        // Type: Number
        threeBedroomUnits: {
          type: 'integer'
        },
        // Description: 4-BR Units are units with 4-bedrooms.
        // Type: Number
        fourBedroomUnits: {
          type: 'integer'
        },
        // Description: 5-BR Units are units with 5-bedrooms.
        // Type: Number
        fiveBedroomUnits: {
          type: 'integer'
        },
        // Description: 6-BR+ Units are units with 6-bedrooms or more.
        // Type: Number
        sixPlusBedroomUnits: {
          type: 'integer'
        },
        // Description: Unknown-BR Units are units with an unknown number of bedrooms.
        // Type: Number
        unknownBedroomUnits: {
          type: 'integer'
        },
        // Description Counted Rental Units are the units in the building, counted toward the Housing New York plan, where assistance has been provided to landlords in exchange for a requirement for affordable units.
        // Type: Number
        countedRentalUnits: {
          type: 'integer'
        },
        // Description: Counted Homeownership Units are the units in the building, counted toward the Housing New York Plan, where assistance has been provided directly to homeowners.
        // Type: Number
        countedHomeOwnershipUnits: {
          type: 'integer'
        },
        // Description: The Counted Units field indicates the total number of affordable, regulated units counted towards the Housing New York plan that are in the building.
        // Type: Number
        allCountedUnits: {
          type: 'integer'
        },
        // Description: The Total Units field indicates the total number of units, affordable and market rate, in each building.
        // Type: Number
        totalUnits: {
          type: 'integer'
        },
        /** END OF FIELDS FROM HPD Open Data -  Housing New York Units by Building **/

        /** START OF FIELDS FROM HPD Open Data -  Building Files **/
        lowHouseNumber: {
          type: 'keyword'
        },
        highHouseNumber: {
          type: 'keyword'
        },
        houseNumberRange: {
          type: 'integer_range',
        },
        // Stores DoB building classification codes as augmented by HPD for other than Multiple Dwellings (see DoBBuildingClass below)
        buildingClass: {
          type: 'keyword'
        },
        // Number of legal stories in a building
        legalStories: {
          type: 'number'
        },
        // The number of apartments in a multiple dwelling
        legalClassAUnits: {
          type: 'number'
        },
        // The number of rooms in a multiple dwelling without individual baths and kitchens
        legalClassBUnits: {
          type: 'number'
        },
        // The stage in the building life cycle. 'Land' ,'Planned' ,'Building' ,'Demolished' ,'Under Construction'
        lifeCycle: {
          type: 'keyword'
        },
        // 'Active', 'Inactive', 'Pending'
        recordStatus: {
          type: 'keyword'
        },
        /** END OF FIELDS FROM HPD Open Data - Building Files **/

        /** START OF FIELDS FROM HPD Open Data - Charges Files **/
        /**
         * Charge information is divided up into three categories of charges:
         * * Open Market Order (OMO) Charges – for work contracted out by HPD
         * * Handyman Work Order (HWO) Charges – for work carried out by HPD staff
         * * Fee Charges – for fees collected by HPD
         */
        omoCharges: {
          type: 'nested',
          properties: {
            // Unique number identifying OMO
            id: {
              type: 'keyword'
            },
            // HPD unique identifier of OMO
            number: {
              type: 'keyword',
            },
            // General Description of Type of work performed by this OMO
            workTypeGeneral: {
              type: 'text',
            },
            // Reason this OMO was closed
            statusReason: {
              type: 'text'
            },
            // Amount this OMO was awarded for
            awardAmount: {
              type: 'float'
            },
            // Date OMO was created by system
            createdAt: {
              type: 'date'
            },
            // Date OMO was created by system
            netChangeOrders: {
              type: 'float'
            },
            // Date OMO was awarded
            awardedAt: {
              type: 'date'
            },
            // Indicates if this OMO was created thru the Alternative Enforcement program
            isAep: {

            },
          }
        },
        /** END OF FIELDS FROM HPD Open Data - Charges Files **/

        /** START OF FIELDS FROM HPD Open Data - Complaint Files **/
        complaints: {
          type: 'nested',
          properties: {
            // System generated unique identifier given to a complaint record
            id: {
              type: 'keyword'
            },
            // System generated unique identifier given to a complaint record
            receivedAt: {
              type: 'date'
            },
            // Contains the unique identifier of the complaint record from external sources. If complaint is made through 311, the field will contain the service request number. If problem is found during an inspection, the field will contain the ComplaintID, if found during reinspection, the field will contain InspectionID 
            referenceNumber: {
              type: 'keyword'
            },
            // 1 = 'Open', 2 = 'Close'
            status: {
              type: 'keyword'
            },
            // Date when the complaint status was updated
            statusUpdatedAt: {
              type: 'date'
            },
            problems: {
              type: 'nested',
              properties: {
                // Unique identifier of this problem
                id: {
                  type: 'keyword'
                },
                // Type of unit where the problem was reported
                // 'APARTMENT', 'BUILDING-WIDE', 'PUBLIC AREA'
                unitType: {
                  type: 'keyword'
                },
                // Type of space where the problem was reported
                spaceType: {
                  type: 'keyword'
                },
                // Numeric code indicating the problem type
                // 'EMERGENCY', 'HAZARDOUS', 'NON EMERGENCY', 'IMMEDIATE EMERGENCY', 'REFERRAL'
                type: {
                  type: 'keyword'
                },
                // The major category of the problem
                // 'APPLIANCE', 'PLUMBING', 'ELECTRIC', 'GENERAL', 'HEATING', 'NONCONST', 'CONSTRUCTION', 'PAINT/PLASTER', 'STRUCTURAL', 'DOOR/WINDOW', 'ELEVATOR', 'FLOORING/STAIRS', 'HEAT/HOT WATER', 'OUTSIDE BUILDING', 'SAFETY', 'UNSANITARY CONDITION', 'WATER LEAK'
                majorCategory: {
                  type: 'keyword'
                },
                // The minor category
                minorCategory: {
                  type: 'keyword'
                },
                code: {
                  type: 'keyword',
                },
                status: {
                  type: 'keyword'
                },
                statusUpdatedAt: {
                  type: 'date',
                },
                statusDescription: {
                  type: 'text',
                }
              }
            }
          }
        },
        /** END OF FIELDS FROM HPD Open Data - Complaint Files **/

        /** START OF FIELDS FROM HPD Open Data - Litigation Files **/
        litigations: {
          type: 'nested',
          properties: {
            id: {
              type: 'keyword',
            },
            type: {
              type: 'keyword'
            },
            openedAt: {
              type: 'date'
            },
            status: {
              type: 'keyword'
            },
            openJudgement: {
              type: 'boolean',
            },
            harassmentFinding: {
              type: 'keyword'
            },
            harassmentFindingAt: {
              type: 'date'
            },
            penalty: {
              type: 'float'
            },
            respondent: {
              type: 'text'
            }
          }
        },
        /** END OF FIELDS FROM HPD Open Data - Litigation Files **/

        /** START OF FIELDS FROM HPD Open Data - Registration Files **/
        registration: {
          type: 'object',
          properties: {
            id: {
              type: 'keyword',
            },
            lastRegisteredAt: {
              type: 'date',
            },
            expiresAt: {
              type: 'date',
            },
            contacts: {
              type: 'nested',
              properties: {
                id: {
                  type: 'keyword'
                },
                // 'Individual Owner', 'Corporate Owner', 'Managing Agent', 'Head Officer', 'Officer', 'Shareholder'
                type: {
                  type: 'keyword'
                },
                description: {
                  type: 'text',
                },
                corporationName: {
                  type: 'text',
                },
                title: {
                  type: 'text',
                },
                firstName: {
                  type: 'text',
                },
                middleInitial: {
                  type: 'text',
                },
                lastName: {
                  type: 'text',
                },
                business: {
                  type: 'object',
                  properties: {
                    houseNumber: {
                      type: 'keyword'
                    },
                    streetName: {
                      type: 'keyword'
                    },
                    apartment: {
                      type: 'keyword'
                    },
                    city: {
                      type: 'keyword'
                    },
                    state: {
                      type: 'keyword'
                    },
                    postalCode: {
                      type: 'keyword'
                    }
                  }
                }
              }
            }
          },
        },
        /** END OF FIELDS FROM HPD Open Data - Registration Files **/

        /** START OF FIELDS FROM HPD Open Data - Violation Files **/
        violations: {
          type: 'nested',
          properties: {
            id: {
              type: 'keyword'
            },
            // 'Current Status'
            status: {
              type: 'keyword'
            },
            statusUpdatedAt: {
              type: 'date'
            },
            apartment: {
              type: 'keyword'
            },
            story: {
              type: 'keyword'
            },
            // Indicator of seriousness of the violations
            class: {
              type: 'keyword'
            },
            // When the violation was observed
            inspectedAt: {
              type: 'date'
            },
            // When the violation was approved
            approvedAt: {
              type: 'date'
            },
            // Original date by when the owner was to inform HPD that the violation as corrected 
            originalCertifyByAt: {
              type: 'date'
            },
            // Original date by when the owner was to correct the violation 
            originalCorrectByAt: {
              type: 'date'
            },
            certifyByAt: {

            },
            correctByAt: {

            },
            certifiedAt: {

            },
            orderNumber: {

            },
            noticeOfViolation: {
              type: 'object',
              properties: {
                id: {

                },
                description: {

                },
                issuedAt: {

                },
                type: {

                },
              }
            },
          }
        },
        /** END OF FIELDS FROM HPD Open Data - Violation Files **/
      }
    }
  }
}
