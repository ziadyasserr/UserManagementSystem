import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserDataForm {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

export default function UserData() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const [updateUser, setUpdateUser] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserDataForm>();

  useEffect(() => {
    if (userId) {
      setUpdateUser(true);
      axios.get<UserDataForm>(`https://dummyjson.com/users/${userId}`).then((response) => {
        const userDataInfo = response.data;
        setValue('firstName', userDataInfo.firstName);
        setValue('lastName', userDataInfo.lastName);
        setValue('email', userDataInfo.email);
        setValue('age', userDataInfo.age);
        setValue('phone', userDataInfo.phone);
        setValue('birthDate', userDataInfo.birthDate);
      });
    }
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<UserDataForm> = async (data) => {
    try {
      if (updateUser) {
        await axios.put(`https://dummyjson.com/users/${userId}`, data);
        toast.success('User updated successfully');
      } else {
        await axios.post('https://dummyjson.com/users/add', data);
        toast.success('User added successfully');
      }
      navigate('/dashboard/userslist');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-5">
        <h3 className="fw-bold">{updateUser ? 'Update User' : 'Add User'}</h3>
        <hr />
      </div>

      <form
        className="shadow p-md-5 p-0 m-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="firstName" className="text-capitalize">
                first name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your First Name"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
            </div>
            {errors?.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="lastName" className="text-capitalize">
                last name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Last Name"
                {...register('lastName', { required: 'Last name is required' })}
              />
            </div>
            {errors?.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="email" className="text-capitalize">
                email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Email is not valid',
                  },
                })}
              />
            </div>
            {errors?.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="age" className="text-capitalize">
                age
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Your Age"
                {...register('age', { required: 'Age is required' })}
              />
            </div>
            {errors?.age && <span className="text-danger">{errors.age.message}</span>}
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="phone" className="text-capitalize">
                phone
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Phone"
                {...register('phone', { required: 'Phone number is required' })}
              />
            </div>
            {errors?.phone && <span className="text-danger">{errors.phone.message}</span>}
          </div>
          <div className="col-12 col-md-6 mb-5">
            <div>
              <label htmlFor="birthDate" className="text-capitalize">
                birth date
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Your Birth Date"
                {...register('birthDate', { required: 'Birth date is required' })}
              />
            </div>
            {errors?.birthDate && (
              <span className="text-danger">{errors.birthDate.message}</span>
            )}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-warning text-light" type="submit">
            {updateUser ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </>
  );
}
