import React, { useState } from 'react';

const Mesob = () => {
  const steps = [
    { title: 'NID OTP Request', description: 'Enter your ID number to request an OTP.' },
    { title: 'OTP Verification', description: 'Enter the OTP you received.' },
    { title: 'Review Demographic Details', description: 'Review and update your demographic details (auto-filled).' },
    { title: 'MOR Tax Info Retrieval', description: 'Retrieve your tax info from MOR.' },
    { title: 'DARS Document Retrieval', description: 'Retrieve your document from DARS.' },
    { title: 'Process Completed', description: 'Review all collected data.' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [idNumber, setIdNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [demoData, setDemoData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: ''
  });
  const [documentData, setDocumentData] = useState({
    morTaxInfo: '',
    document: ''
  });


  const handleGetOtp = async () => {
    if (!idNumber) {
      setMessage('Please enter your ID number.');
      return;
    }
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setMessage('OTP has been sent to your registered mobile number.');
    setCurrentStep(1);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDemoData({
      name: 'dagmawi mekonnen Kidane',
      dob: '1997-03-14',
      gender: 'Male',
      address: 'Addis Ababa, Woreda 04 , 433'
    });
    setLoading(false);
    setMessage('OTP verified. Demographic data fetched.');
    setCurrentStep(2);
  };

  const handleSubmitDemographics = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setMessage('Demographic details confirmed.');
    setCurrentStep(3);
  };

  const handleRetrieveTaxInfo = async () => {
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDocumentData(prev => ({
      ...prev,
      morTaxInfo: 'Your tax record for 2021 is in good standing.'
    }));
    setLoading(false);
    setMessage('Tax information retrieved successfully.');
  };

  const handleRetrieveDocument = async () => {
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDocumentData(prev => ({
      ...prev,
      document: 'https://via.placeholder.com/400x300?text=Sample+Document'
    }));
    setLoading(false);
    setMessage('Document retrieved successfully.');
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setMessage('');
    setIdNumber('');
    setOtp('');
    setDemoData({ name: '', dob: '', gender: '', address: '' });
    setDocumentData({ morTaxInfo: '', document: '' });
  };

  const NavigationButtons = ({ onBack, onNext, nextLabel }) => (
    <div className="flex justify-between mt-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      ) : <div></div>}
      {onNext ? (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {nextLabel || 'Next'}
        </button>
      ) : <div></div>}
    </div>
  );


  const renderStep0 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-2">Step 1: NID OTP Request</h2>
      <p className="mb-4">{steps[0].description}</p>
      <input
        type="text"
        placeholder="Enter your ID number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-4"
      />
      {loading ? (
        <p className="text-blue-500">Processing...</p>
      ) : (
        <button
          onClick={handleGetOtp}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Get OTP
        </button>
      )}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );

  const renderStep1 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-2">Step 2: OTP Verification</h2>
      <p className="mb-4">{steps[1].description}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-4"
      />
      {loading ? (
        <p className="text-blue-500">Verifying OTP...</p>
      ) : (
        <NavigationButtons
          onBack={() => { setMessage(''); setCurrentStep(0); }}
          onNext={handleVerifyOtp}
          nextLabel="Verify OTP"
        />
      )}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );

  const renderStep2 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-2">Step 3: Review Demographic Details</h2>
      <p className="mb-4">{steps[2].description}</p>
      <form onSubmit={handleSubmitDemographics}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={demoData.name}
            onChange={(e) => setDemoData({ ...demoData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
        </label>
        <label className="block mb-2">
          Date of Birth:
          <input
            type="date"
            value={demoData.dob}
            onChange={(e) => setDemoData({ ...demoData, dob: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
        </label>
        <label className="block mb-2">
          Gender:
          <select
            value={demoData.gender}
            onChange={(e) => setDemoData({ ...demoData, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mt-1"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label className="block mb-4">
          Address:
          <input
            type="text"
            value={demoData.address}
            onChange={(e) => setDemoData({ ...demoData, address: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
        </label>
        {loading ? (
          <p className="text-blue-500">Submitting details...</p>
        ) : (
          <NavigationButtons
            onBack={() => { setMessage(''); setCurrentStep(1); }}
            onNext={handleSubmitDemographics}
            nextLabel="Confirm Details"
          />
        )}
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );

  const renderStep3 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-2">Step 4: MOR Tax Info Retrieval</h2>
      <p className="mb-4">{steps[3].description}</p>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Demographic Details (Read-Only):</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            value={demoData.name}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="date"
            value={demoData.dob}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={demoData.gender}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={demoData.address}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-blue-500">Retrieving tax info...</p>
      ) : (
        <NavigationButtons
          onBack={() => { setMessage(''); setCurrentStep(2); }}
          onNext={handleRetrieveTaxInfo}
          nextLabel="Retrieve Tax Info"
        />
      )}
      {documentData.morTaxInfo && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Tax Information (MOR):</h3>
          <p className="border p-2 rounded bg-gray-100">{documentData.morTaxInfo}</p>
        </div>
      )}
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => { setMessage(''); setCurrentStep(4); }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-2">Step 5: DARS Document Retrieval</h2>
      <p className="mb-4">{steps[4].description}</p>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Demographic Details (Read-Only):</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            value={demoData.name}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="date"
            value={demoData.dob}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={demoData.gender}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={demoData.address}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-blue-500">Retrieving document...</p>
      ) : (
        <NavigationButtons
          onBack={() => { setMessage(''); setCurrentStep(3); }}
          onNext={handleRetrieveDocument}
          nextLabel="Retrieve Document"
        />
      )}
      {documentData.document && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sample Document (DARS):</h3>
          <img
            src={documentData.document}
            alt="Sample Document"
            className="w-full max-w-md border rounded"
          />
        </div>
      )}
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => { setMessage(''); setCurrentStep(5); }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="border p-4 rounded-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Process Completed</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Demographic Details:</h3>
        {demoData ? (
          <ul className="list-disc ml-6">
            <li>Name: {demoData.name}</li>
            <li>Date of Birth: {demoData.dob}</li>
            <li>Gender: {demoData.gender}</li>
            <li>Address: {demoData.address}</li>
          </ul>
        ) : (
          <p>No demographic details available.</p>
        )}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Document Data:</h3>
        {documentData ? (
          <ul className="list-disc ml-6">
            {documentData.morTaxInfo && <li>Tax Info (MOR): {documentData.morTaxInfo}</li>}
            {documentData.document && <li>Document (DARS): Retrieved</li>}
          </ul>
        ) : (
          <p>No document data available.</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => { setMessage(''); setCurrentStep(4); }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Restart Process
        </button>
      </div>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="space-y-6">
        {currentStep === 0 && renderStep0()}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>
    </div>
  );
};

export default Mesob;
