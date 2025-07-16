import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ 
  id, 
  name, 
  username, 
  email, 
  address, 
  phone, 
  website, 
  company 
}) => {
  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">@{username}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Email:</span>
          <span>{email}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Phone:</span>
          <span>{phone}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Website:</span>
          <span>{website}</span>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Address:</span>
          <p>{address.street}, {address.suite}</p>
          <p>{address.city}, {address.zipcode}</p>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Company:</span>
          <p>{company.name}</p>
          <p className="italic">{company.catchPhrase}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>User ID: {id}</span>
        <span>Lat: {address.geo.lat}</span>
      </div>
    </div>
  );
};

export default UserCard;
