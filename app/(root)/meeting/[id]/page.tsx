const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-black  p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">
          Page ID: {id}
        </h1>
        <p className="text-lg text-gray-600">
          This is a dynamically generated page based on the ID.
        </p>
      </div>
    </div>
  );
};

export default Page;
