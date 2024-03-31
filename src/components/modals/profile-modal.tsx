import { useAppDispatch } from "@/store/hooks";
import { user as UD, updateUser } from "@/store/slice/auth-slice";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { object, ref, string } from "yup";
import { loading as LD, imagePath as IP } from "@/store/slice/auth-slice";
import { IUpdateUserPayload } from "@/types/auth.type";
import ImageCropper from "../cropper/image-cropper";
import Image from "next/image";
import NextImage from "next/image";
import { getPhoto } from "../../configs/api-config";

type TProps = {
  show: boolean;
  onHide: () => void;
};
const initialValues = {
  city: "",
  email: "",
  mobile_no: "",
  name: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ProfileModal = (props: TProps) => {
  const { show, onHide } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const user = useSelector(UD);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const loading = useSelector(LD);
  const imagePath = useSelector(IP);

  console.log("user", user, imagePath);
  const validationSchema = () => {
    const updateProfile = object().shape({
      city: string().required("Required"),
      email: string().required("Required"),
      mobile_no: string().required("Required"),
      name: string().required("Required"),
    });

    const updatePassword = object().shape({
      oldPassword: string().required("Required"),
      newPassword: string().required("Required"),
      confirmNewPassword: string()
        .required("Required")
        .oneOf([ref("password")], "Passwords must match"),
    });

    if (isUpdatePassword) {
      return updatePassword;
    }
    return updateProfile;
  };
  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    try {
      if (isEditable) {
        if (croppedImage) {
          const payload: IUpdateUserPayload = {
            ...formik.values,
            image: file,
          }
          await dispatch(updateUser(payload)).unwrap();
          // if (res.success) {
          //   if (res.data.bearer_token) {
          //     router.push("/");
          //   } else {
          //     router.push("/verify-otp");
          //   }
          // }
        }

      } else {

      }
  } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    if (!isEditable && show) {
      formik.setFieldValue("city", user?.city);
      formik.setFieldValue("name", user?.name);
      formik.setFieldValue("email", user?.email);
      formik.setFieldValue("mobile_no", user?.mobile_no);
      setCroppedImage(getPhoto(imagePath as string, user?.image as string))
    }
  }, [isEditable, show]);
  return (
    <Modal
      backdrop={"blur"}
      className={`rounded-3xl p-5 max-xs:px-0 text-black`}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      isOpen={show}
      onClose={()=>{onHide();setIsEditable(false)}}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>
          <h1>My Profile</h1>
        </ModalHeader>
        <form
          onSubmit={(e) => {
            !croppedImage && setShowImageError(true);
            formik.handleSubmit(e);
          }}
        >
          <ModalBody className="">
            {isUpdatePassword ? (
              <>
                <div>
                  <Input
                    type="password"
                    name="oldPassword"
                    label="Old Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.oldPassword &&
                        formik.touched.oldPassword) as boolean
                    }
                    errorMessage={
                      formik.errors.oldPassword &&
                      formik.touched.oldPassword &&
                      formik.errors.oldPassword
                    }
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    name="newPassword"
                    label="New Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.newPassword &&
                        formik.touched.newPassword) as boolean
                    }
                    errorMessage={
                      formik.errors.newPassword &&
                      formik.touched.newPassword &&
                      formik.errors.newPassword
                    }
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    name="confirmNewPassword"
                    label="confirm New Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.confirmNewPassword &&
                        formik.touched.confirmNewPassword) as boolean
                    }
                    errorMessage={
                      formik.errors.confirmNewPassword &&
                      formik.touched.confirmNewPassword &&
                      formik.errors.confirmNewPassword
                    }
                  />
                </div>
              </>
            ) : (
              <>
                {!isEditable ? (
                  <div className="w-[100px] h-[100px] overflow-hidden m-auto border  rounded-xl shadow ">
                    <Image
                      src={getPhoto(imagePath as string, user?.image as string)}
                      alt="Cropped"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : (
                  <ImageCropper
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    showImageError={showImageError}
                    setShowImageError={setShowImageError}
                    setFile={setFile}
                  />
                )}

                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                  <div>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.errors.name && formik.touched.name) as boolean
                      }
                      errorMessage={
                        formik.errors.name &&
                        formik.touched.name &&
                        formik.errors.name
                      }
                      disabled={!isEditable}
                    />
                  </div>

                  <div>
                    <Input
                      type="number"
                      name="mobile_no"
                      label="Mobile number"
                      value={formik.values.mobile_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.errors.mobile_no &&
                          formik.touched.mobile_no) as boolean
                      }
                      errorMessage={
                        formik.errors.mobile_no &&
                        formik.touched.mobile_no &&
                        formik.errors.mobile_no
                      }
                      disabled={!isEditable}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      label="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.errors.email && formik.touched.email) as boolean
                      }
                      errorMessage={
                        formik.errors.email &&
                        formik.touched.email &&
                        formik.errors.email
                      }
                      disabled={!isEditable}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="city"
                      label="City"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.errors.city && formik.touched.city) as boolean
                      }
                      errorMessage={
                        formik.errors.city &&
                        formik.touched.city &&
                        formik.errors.city
                      }
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <div className="flex gap-2">
              {!isEditable && (
                <Button
                  color="secondary"
                  onClick={() => {
                    setIsEditable(!isEditable);
                    setIsUpdatePassword(false);
                  }}
                >
                  Update Profile
                </Button>
              )}
              {!isUpdatePassword && (
                <Button
                  color="secondary"
                  onClick={() => {
                    setIsUpdatePassword(!isUpdatePassword);

                    setIsEditable(false);
                  }}
                >
                  Update Password
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {(isEditable || isUpdatePassword) && (
                <Button color="primary" type="submit" isLoading={loading}>
                  <span>Submit</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              )}
              <Button color="danger" onClick={()=>{onHide();setIsEditable(false)}}>
                Close
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
