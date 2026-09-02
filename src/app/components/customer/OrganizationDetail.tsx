import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const mockOrganizations = [
  { 
    id: 1, 
    organizationName: "TechCorp Solutions AB",
    orgNumber: "556789-1234",
    branchNumber: "–",
    dunsNumber: "788989",
    organizationType: "Branch",
    country: "SE",
    source: "Dun & Bradstreet",
    status: "Active",
    email: "company@techcorp.se",
    phone: "+46 707 77 777",
    loyaltyProgram: "EG Trondheim",
    addresses: {
      general: {
        line1: "Fredsgatan 3",
        line2: "",
        postalCode: "413 03",
        city: "Göteborg",
        country: "Sweden"
      },
      delivery: {
        inheritGeneral: true,
        line1: "Fredsgatan 33",
        line2: "",
        postalCode: "413 03",
        city: "Göteborg",
        country: "Sweden"
      },
      invoice: {
        inheritGeneral: true,
        line1: "Fredsgatan 33",
        line2: "",
        postalCode: "413 03",
        city: "Göteborg",
        country: "Sweden"
      }
    },
    businessCustomers: [
      { id: 1, name: "EG Retail Norway", identifier: "11223344", email: "ofrib@eg.se", phone: "+46 707257076", status: "Active" },
      { id: 2, name: "EG Retail Sweden", identifier: "44332211", email: "adfin@eg.no", phone: "+47 673578962", status: "Active" }
    ]
  },
  { 
    id: 2, 
    organizationName: "Nordic Retail Group",
    orgNumber: "559876-5432",
    branchNumber: "–",
    organizationType: "Subsidiary",
    country: "SE",
    source: "Manual",
    status: "Active",
    email: "contact@nordicretail.se",
    phone: "+46 31 789 012 34",
    loyaltyProgram: "EG Stockholm",
    addresses: {
      general: {
        line1: "Kungsgatan 45",
        line2: "",
        postalCode: "411 19",
        city: "Göteborg",
        country: "Sweden"
      },
      delivery: {
        inheritGeneral: false,
        line1: "Leveransgatan 12",
        line2: "",
        postalCode: "411 20",
        city: "Göteborg",
        country: "Sweden"
      },
      invoice: {
        inheritGeneral: false,
        line1: "Fakturagatan 8",
        line2: "",
        postalCode: "411 21",
        city: "Göteborg",
        country: "Sweden"
      }
    },
    businessCustomers: [
      { id: 3, name: "Retail Partner AB", identifier: "55667788", email: "info@retailpartner.se", phone: "+46 8 123 456 78", status: "Active" }
    ]
  },
  {
    id: 9,
    organizationName: "EG Retail Trondheim",
    orgNumber: "968992600",
    branchNumber: "9689926",
    organizationType: "Branch",
    country: "NO",
    source: "Manual",
    status: "Active",
    email: "post@egretailtrondheim.no",
    phone: "+47 73 12 34 56",
    loyaltyProgram: "EG Trondheim",
    addresses: {
      general: {
        line1: "Skonnertvegen 8-10",
        line2: "",
        postalCode: "7053",
        city: "Trondheim",
        country: "Norway"
      },
      delivery: {
        inheritGeneral: true,
        line1: "Skonnertvegen 8-10",
        line2: "",
        postalCode: "7053",
        city: "Trondheim",
        country: "Norway"
      },
      invoice: {
        inheritGeneral: false,
        line1: "Skonnertvegen 10",
        line2: "",
        postalCode: "7053",
        city: "Trondheim",
        country: "Norway"
      }
    },
    businessCustomers: [
      { id: 12, name: "EG Retail Trondheim", identifier: "738291045", email: "post@egretailtrondheim.no", phone: "+4773123456", status: "Active" }
    ]
  },
];

export function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const organization = mockOrganizations.find(org => org.id === Number(id));
  const [deliveryInherit, setDeliveryInherit] = useState(true);
  const [invoiceInherit, setInvoiceInherit] = useState(true);

  // State for editable fields
  const [formData, setFormData] = useState({
    organizationName: '',
    orgNumber: '',
    branchNumber: '',
    organizationType: '',
    country: '',
    email: '',
    phone: '',
    loyaltyProgram: '',
    addresses: {
      general: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        country: ''
      },
      delivery: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        country: ''
      },
      invoice: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        country: ''
      }
    }
  });

  // Update formData when id changes
  useEffect(() => {
    const org = mockOrganizations.find(org => org.id === Number(id));
    if (org) {
      setFormData({
        organizationName: org.organizationName || '',
        orgNumber: org.orgNumber || '',
        branchNumber: org.branchNumber || '',
        organizationType: org.organizationType || '',
        country: org.country || '',
        email: org.email || '',
        phone: org.phone || '',
        loyaltyProgram: org.loyaltyProgram || '',
        addresses: {
          general: {
            line1: org.addresses.general.line1 || '',
            line2: org.addresses.general.line2 || '',
            postalCode: org.addresses.general.postalCode || '',
            city: org.addresses.general.city || '',
            country: org.addresses.general.country || ''
          },
          delivery: {
            line1: org.addresses.delivery.line1 || '',
            line2: org.addresses.delivery.line2 || '',
            postalCode: org.addresses.delivery.postalCode || '',
            city: org.addresses.delivery.city || '',
            country: org.addresses.delivery.country || ''
          },
          invoice: {
            line1: org.addresses.invoice.line1 || '',
            line2: org.addresses.invoice.line2 || '',
            postalCode: org.addresses.invoice.postalCode || '',
            city: org.addresses.invoice.city || '',
            country: org.addresses.invoice.country || ''
          }
        }
      });
      setDeliveryInherit(org.addresses.delivery.inheritGeneral ?? true);
      setInvoiceInherit(org.addresses.invoice.inheritGeneral ?? true);
    }
  }, [id]);

  if (!organization) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Organization not found</p>
      </div>
    );
  }

  const isReadOnly = organization.source === "Dun & Bradstreet";
  const showDunsNumber = organization.source === "Dun & Bradstreet";

  const handleSave = () => {
    console.log("Save organization changes", formData);
    // Add save logic here
  };

  const handleMoreOptions = () => {
    console.log("More options");
    // Add more options logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (addressType: 'general' | 'delivery' | 'invoice', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [addressType]: {
          ...prev.addresses[addressType],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9]">
      <div className="flex-1 overflow-auto">
        <div className="p-8 w-full">
          {/* TOP SECTION - 3 COLUMNS: ORGANIZATION + CONTACT + DETAILS */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* ORGANIZATION SECTION */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">ORGANIZATION</h2>
              
              {/* Organization name */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">
                  {!isReadOnly && <span className="text-[#FF0000]">* </span>}
                  Organization name
                </label>
                <input 
                  type="text"
                  value={formData.organizationName}
                  disabled={isReadOnly}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className={`w-full text-[14px] text-[#1A1A1A] bg-white px-2 py-1 focus:outline-none ${
                    isReadOnly 
                      ? 'border-b border-transparent cursor-default bg-transparent' 
                      : 'border border-[#CCCCCC] focus:border-[#373737]'
                  }`}
                />
              </div>

              {/* Organization number */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Organization number</label>
                <input 
                  type="text"
                  value={formData.orgNumber}
                  disabled={isReadOnly}
                  onChange={(e) => handleInputChange('orgNumber', e.target.value)}
                  className={`w-full text-[14px] text-[#1A1A1A] bg-white px-2 py-1 focus:outline-none ${
                    isReadOnly 
                      ? 'border-b border-transparent cursor-default bg-transparent' 
                      : 'border border-[#CCCCCC] focus:border-[#373737]'
                  }`}
                />
              </div>

              {/* Branch number */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Branch number</label>
                <input 
                  type="text"
                  value={formData.branchNumber}
                  disabled={isReadOnly}
                  onChange={(e) => handleInputChange('branchNumber', e.target.value)}
                  className={`w-full text-[14px] text-[#1A1A1A] bg-white px-2 py-1 focus:outline-none ${
                    isReadOnly 
                      ? 'border-b border-transparent cursor-default bg-transparent' 
                      : 'border border-[#CCCCCC] focus:border-[#373737]'
                  }`}
                />
              </div>

              {/* DUNS number - only shown for D&B organizations */}
              {showDunsNumber && (
                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">DUNS number</label>
                  <input 
                    type="text"
                    value={organization.dunsNumber}
                    disabled
                    className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                  />
                </div>
              )}

              {/* Organization type */}
              <div className="mb-4">
                <label className="block text-[11px] mb-1 text-[#737373]">
                  {!isReadOnly && <span className="text-[#FF0000]">* </span>}
                  Organization type
                </label>
                {isReadOnly ? (
                  <input 
                    type="text"
                    value={organization.organizationType}
                    disabled
                    className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                  />
                ) : (
                  <select 
                    value={formData.organizationType}
                    onChange={(e) => handleInputChange('organizationType', e.target.value)}
                    className="w-full text-[14px] text-[#1A1A1A] bg-white border border-[#CCCCCC] px-2 py-1 focus:outline-none focus:border-[#373737]"
                  >
                    <option value="Branch">Branch</option>
                    <option value="Subsidiary">Subsidiary</option>
                    <option value="Headquarters">Headquarters</option>
                  </select>
                )}
              </div>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-[11px] mb-1 text-[#737373]">
                  {!isReadOnly && <span className="text-[#FF0000]">* </span>}
                  Country
                </label>
                {isReadOnly ? (
                  <input 
                    type="text"
                    value={organization.country}
                    disabled
                    className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                  />
                ) : (
                  <select 
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full text-[14px] text-[#1A1A1A] bg-white border border-[#CCCCCC] px-2 py-1 focus:outline-none focus:border-[#373737]"
                  >
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="DK">Denmark</option>
                    <option value="FI">Finland</option>
                  </select>
                )}
              </div>
            </div>

            {/* CONTACT SECTION */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">CONTACT</h2>
              
              {/* Email */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Email</label>
                <input 
                  type="text"
                  value={formData.email}
                  disabled={isReadOnly}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full text-[14px] text-[#1A1A1A] bg-white px-2 py-1 focus:outline-none ${
                    isReadOnly 
                      ? 'border-b border-transparent cursor-default bg-transparent' 
                      : 'border border-[#CCCCCC] focus:border-[#373737]'
                  }`}
                />
              </div>

              {/* Phone number */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Phone number</label>
                <input 
                  type="text"
                  value={formData.phone}
                  disabled={isReadOnly}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full text-[14px] text-[#1A1A1A] bg-white px-2 py-1 focus:outline-none ${
                    isReadOnly 
                      ? 'border-b border-transparent cursor-default bg-transparent' 
                      : 'border border-[#CCCCCC] focus:border-[#373737]'
                  }`}
                />
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">DETAILS</h2>
              
              {/* Loyalty program */}
              <div className="mb-4">
                <label className="block text-[11px] mb-1 text-[#737373]">
                  {!isReadOnly && <span className="text-[#FF0000]">* </span>}
                  Loyalty program
                </label>
                {isReadOnly ? (
                  <input 
                    type="text"
                    value={organization.loyaltyProgram}
                    disabled
                    className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                  />
                ) : (
                  <select 
                    value={formData.loyaltyProgram}
                    onChange={(e) => handleInputChange('loyaltyProgram', e.target.value)}
                    className="w-full text-[14px] text-[#1A1A1A] bg-white border border-[#CCCCCC] px-2 py-1 focus:outline-none focus:border-[#373737]"
                  >
                    <option value="EG Trondheim">EG Trondheim</option>
                    <option value="EG Stockholm">EG Stockholm</option>
                    <option value="EG Oslo">EG Oslo</option>
                  </select>
                )}
              </div>

              {/* Organization status */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Organization status</label>
                <div className="text-[14px] text-[#1A1A1A] py-1">{organization.status}</div>
              </div>

              {/* Source */}
              <div className="mb-4">
                <label className="block text-[11px] text-[#737373] mb-1">Source</label>
                <div className="text-[14px] text-[#1A1A1A] py-1">{organization.source}</div>
              </div>

              {/* Synchronizing - only shown for D&B organizations */}
              {organization.source === "Dun & Bradstreet" && (
                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Synchronizing</label>
                  <input 
                    type="text"
                    value="Dun & Bradstreet"
                    disabled
                    className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ADDRESS SECTION */}
          <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">ADDRESS</h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* GENERAL ADDRESS */}
              <div>
                <h3 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">GENERAL ADDRESS</h3>
                
                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 1</label>
                  <input 
                    type="text"
                    value={formData.addresses.general.line1}
                    disabled={isReadOnly}
                    onChange={(e) => handleAddressChange('general', 'line1', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly 
                        ? 'bg-transparent border-b border-transparent cursor-default' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 2</label>
                  <input 
                    type="text"
                    value={formData.addresses.general.line2}
                    disabled={isReadOnly}
                    onChange={(e) => handleAddressChange('general', 'line2', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly 
                        ? 'bg-transparent border-b border-transparent cursor-default' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Postal code</label>
                  <input 
                    type="text"
                    value={formData.addresses.general.postalCode}
                    disabled={isReadOnly}
                    onChange={(e) => handleAddressChange('general', 'postalCode', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly 
                        ? 'bg-transparent border-b border-transparent cursor-default' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">City</label>
                  <input 
                    type="text"
                    value={formData.addresses.general.city}
                    disabled={isReadOnly}
                    onChange={(e) => handleAddressChange('general', 'city', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly 
                        ? 'bg-transparent border-b border-transparent cursor-default' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Country</label>
                  {isReadOnly ? (
                    <input 
                      type="text"
                      value={organization.addresses.general.country}
                      disabled
                      className="w-full text-[14px] text-[#1A1A1A] bg-transparent border-b border-transparent cursor-default pb-1"
                    />
                  ) : (
                    <select 
                      value={formData.addresses.general.country}
                      onChange={(e) => handleAddressChange('general', 'country', e.target.value)}
                      className="w-full text-[14px] text-[#1A1A1A] bg-white border border-[#CCCCCC] px-2 py-1 focus:outline-none focus:border-[#373737]"
                    >
                      <option value="Sweden">Sweden</option>
                      <option value="Norway">Norway</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Finland">Finland</option>
                    </select>
                  )}
                </div>
              </div>

              {/* DELIVERY ADDRESS */}
              <div>
                <h3 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">DELIVERY ADDRESS</h3>
                
                <div className="mb-4 flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={deliveryInherit}
                    onChange={(e) => setDeliveryInherit(e.target.checked)}
                    disabled={isReadOnly}
                    className="w-4 h-4 accent-[#373737]"
                    id="delivery-inherit"
                  />
                  <label htmlFor="delivery-inherit" className="text-[11px] text-[#737373] cursor-pointer">
                    Inherit general adress
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 1</label>
                  <input 
                    type="text"
                    value={formData.addresses.delivery.line1}
                    disabled={isReadOnly || deliveryInherit}
                    onChange={(e) => handleAddressChange('delivery', 'line1', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || deliveryInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 2</label>
                  <input 
                    type="text"
                    value={formData.addresses.delivery.line2}
                    disabled={isReadOnly || deliveryInherit}
                    onChange={(e) => handleAddressChange('delivery', 'line2', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || deliveryInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Postal code</label>
                  <input 
                    type="text"
                    value={formData.addresses.delivery.postalCode}
                    disabled={isReadOnly || deliveryInherit}
                    onChange={(e) => handleAddressChange('delivery', 'postalCode', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || deliveryInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">City</label>
                  <input 
                    type="text"
                    value={formData.addresses.delivery.city}
                    disabled={isReadOnly || deliveryInherit}
                    onChange={(e) => handleAddressChange('delivery', 'city', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || deliveryInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Country</label>
                  <select 
                    value={formData.addresses.delivery.country}
                    disabled={isReadOnly || deliveryInherit}
                    onChange={(e) => handleAddressChange('delivery', 'country', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || deliveryInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  >
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                  </select>
                </div>
              </div>

              {/* INVOICE ADDRESS */}
              <div>
                <h3 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">INVOICE ADDRESS</h3>
                
                <div className="mb-4 flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={invoiceInherit}
                    onChange={(e) => setInvoiceInherit(e.target.checked)}
                    disabled={isReadOnly}
                    className="w-4 h-4 accent-[#373737]"
                    id="invoice-inherit"
                  />
                  <label htmlFor="invoice-inherit" className="text-[11px] text-[#737373] cursor-pointer">
                    Inherit general adress
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 1</label>
                  <input 
                    type="text"
                    value={formData.addresses.invoice.line1}
                    disabled={isReadOnly || invoiceInherit}
                    onChange={(e) => handleAddressChange('invoice', 'line1', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || invoiceInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Address line 2</label>
                  <input 
                    type="text"
                    value={formData.addresses.invoice.line2}
                    disabled={isReadOnly || invoiceInherit}
                    onChange={(e) => handleAddressChange('invoice', 'line2', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || invoiceInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Postal code</label>
                  <input 
                    type="text"
                    value={formData.addresses.invoice.postalCode}
                    disabled={isReadOnly || invoiceInherit}
                    onChange={(e) => handleAddressChange('invoice', 'postalCode', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || invoiceInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">City</label>
                  <input 
                    type="text"
                    value={formData.addresses.invoice.city}
                    disabled={isReadOnly || invoiceInherit}
                    onChange={(e) => handleAddressChange('invoice', 'city', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || invoiceInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-[#737373] mb-1">Country</label>
                  <select 
                    value={formData.addresses.invoice.country}
                    disabled={isReadOnly || invoiceInherit}
                    onChange={(e) => handleAddressChange('invoice', 'country', e.target.value)}
                    className={`w-full text-[14px] text-[#1A1A1A] px-2 py-1 focus:outline-none ${
                      isReadOnly || invoiceInherit
                        ? 'bg-[#F4F6F7] border border-[#CCCCCC] cursor-default text-[#999999]' 
                        : 'bg-white border border-[#CCCCCC] focus:border-[#373737]'
                    }`}
                  >
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* BUSINESS CUSTOMERS SECTION */}
          <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">BUSINESS CUSTOMERS</h2>
            
            <div className="overflow-hidden border border-[#CCCCCC]">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#595959]">
                    <th className="px-4 py-2 text-left text-[11px] font-bold text-white uppercase tracking-wider border-r border-white">NAME</th>
                    <th className="px-4 py-2 text-left text-[11px] font-bold text-white uppercase tracking-wider border-r border-white">IDENTIFIER</th>
                    <th className="px-4 py-2 text-left text-[11px] font-bold text-white uppercase tracking-wider border-r border-white">EMAIL</th>
                    <th className="px-4 py-2 text-left text-[11px] font-bold text-white uppercase tracking-wider border-r border-white">PHONE NUMBER</th>
                    <th className="px-4 py-2 text-left text-[11px] font-bold text-white uppercase tracking-wider">STATUS</th>
                  </tr>
                  {/* Filter Row */}
                  <tr className="bg-[#F4F6F7]">
                    <th className="px-2 py-2 border-b border-[#CCCCCC] border-r border-white">
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737]"
                        />
                        <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-2 py-2 border-b border-[#CCCCCC] border-r border-white">
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737]"
                        />
                        <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-2 py-2 border-b border-[#CCCCCC] border-r border-white">
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737]"
                        />
                        <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-2 py-2 border-b border-[#CCCCCC] border-r border-white">
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737]"
                        />
                        <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-2 py-2 border-b border-[#CCCCCC]">
                      <div className="flex items-center gap-1">
                        <input 
                          type="text"
                          className="flex-1 h-[30px] bg-white border border-[#CCCCCC] px-2 text-[14px] focus:outline-none focus:border-2 focus:border-[#373737]"
                        />
                        <button className="w-[30px] h-[30px] shrink-0 bg-white border border-[#CCCCCC] flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {organization.businessCustomers.map((customer, idx) => (
                    <tr key={customer.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F7]'}>
                      <td className="px-4 py-3 text-[14px] text-[#1A1A1A] border-b border-[#CCCCCC]">{customer.name}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1A1A1A] border-b border-[#CCCCCC]">{customer.identifier}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1A1A1A] border-b border-[#CCCCCC]">{customer.email}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1A1A1A] border-b border-[#CCCCCC]">{customer.phone}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1A1A1A] border-b border-[#CCCCCC]">{customer.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="bg-white relative shrink-0 w-full border-t border-[#CCCCCC]" data-name="Toolbar">
        <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[20px] py-[10px] relative w-full">
            {/* More button (...) */}
            <button
              onClick={handleMoreOptions}
              className="bg-[#EAEAEA] content-stretch flex h-[30px] items-center justify-center px-[16px] py-[1px] relative rounded-[33554400px] shrink-0 hover:bg-[#D5D5D5] transition-colors"
            >
              <p className="font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[13px] text-center text-[#1A1A1A] uppercase">...</p>
            </button>
            
            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={isReadOnly}
              className={`content-stretch flex h-[30px] items-center justify-center px-[16px] py-[1px] relative rounded-[33554400px] shrink-0 transition-colors ${
                isReadOnly 
                  ? 'bg-[#CCCCCC] cursor-not-allowed' 
                  : 'bg-[#1C7862] hover:bg-[#155A4A]'
              }`}
            >
              <p className={`font-['Roboto_Condensed:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[13px] text-center uppercase ${
                isReadOnly ? 'text-[#999999]' : 'text-white'
              }`}>Save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}