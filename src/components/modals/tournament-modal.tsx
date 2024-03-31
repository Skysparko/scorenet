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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { date, object, ref, string } from "yup";
import { loading as LD, imagePath as IP } from "@/store/slice/auth-slice";
import { IUpdateUserPayload } from "@/types/auth.type";
import ImageCropper from "../cropper/image-cropper";
import Image from "next/image";
import NextImage from "next/image";
import { getPhoto } from "../../configs/api-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createTournament,
  updateTournament,
} from "@/store/slice/tournament-slice";
import {
  ICreateTournamentPayload,
  ITournament,
  IUpdateTournamentPayload,
} from "@/types/tournament.type";

type TProps = {
  show: boolean;
  onHide: () => void;
  type: "ADD" | "VIEW" | "EDIT";
  data?: ITournament;
};

interface IInitialValues {
  sport: string;
  title: string;
  season: string;
  fromDate: Date | null;
  toDate: Date | null;
  endDate: Date | null;
  type: string;
  winPoint: string;
}

const initialValues: IInitialValues = {
  sport: "",
  title: "",
  season: "",
  fromDate: null,
  toDate: null,
  endDate: null,
  type: "",
  winPoint: "",
};

const TournamentModal = (props: TProps) => {
  const { show, onHide, type, data } = props;
  const sportType = ["Cricket", "Badminton", "Volleyball"];
  const tournamentType = ["Single", "Double", "Team"];
  const [operation, setOperation] = useState("Add");
  const user = useSelector(UD);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const loading = useSelector(LD);
  const imagePath = useSelector(IP);

  const validationSchema = object().shape({
    sport: string().required("Required"),
    title: string().required("Required"),
    season: string().required("Required"),
    fromDate: date().required("Required"),
    toDate: date().required("Required"),
    endDate: date().required("Required"),
    type: string().required("Required"),
    winPoint: string().required("Required"),
  });

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    try {
      if (type === "ADD") {
        if (croppedImage) {
          const payload: ICreateTournamentPayload = {
            sport: formik.values.sport,
            title: formik.values.title,
            season: formik.values.season,
            from_date: formik.values.fromDate,
            to_date: formik.values.toDate,
            end_date: formik.values.endDate,
            type: formik.values.type,
            win_point: formik.values.winPoint,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(createTournament(payload)).unwrap();
          if (res.success) {
            onHide();
          }
        }
      } else {
        if (croppedImage) {
          const payload: IUpdateTournamentPayload = {
            sport: formik.values.sport,
            title: formik.values.title,
            season: formik.values.season,
            from_date: formik.values.fromDate,
            to_date: formik.values.toDate,
            end_date: formik.values.endDate,
            type: formik.values.type,
            win_point: formik.values.winPoint,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(
            updateTournament({ payload, id: data?.tnid as string })
          ).unwrap();
          if (res.success) {
            onHide();
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  console.log("Tournament", croppedImage, data);
  useEffect(() => {
    switch (type) {
      case "ADD":
        setOperation("Add");
        setCroppedImage("");
        formik.resetForm();
        break;
      case "EDIT":
        if (data) {
          formik.setValues({
            endDate: data?.end_date,
            fromDate: data.from_date,
            season: data?.season,
            sport: data?.sport,
            title: data.title,
            toDate: data.to_date,
            type: data.type,
            winPoint: data.win_point,
          });
          setCroppedImage(getPhoto(imagePath as string, data?.logo as string));
        }
        setOperation("Edit");
        break;
      case "VIEW":
        if (data) {
          formik.setValues({
            endDate: data?.end_date,
            fromDate: data.from_date,
            season: data?.season,
            sport: data?.sport,
            title: data.title,
            toDate: data.to_date,
            type: data.type,
            winPoint: data.win_point,
          });
          console.log("view", data?.logo);
          setCroppedImage(getPhoto(imagePath as string, data?.logo as string));
        }
        setOperation("My");
        break;
    }
  }, [type, show]);

  return (
    <Modal
      backdrop={"blur"}
      className={`rounded-3xl p-5 max-xs:px-0 text-black`}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      isOpen={show}
      onClose={() => {
        onHide();
        // setCroppedImage("")
        // setIsEditable(false);
      }}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>
          <h1>{operation} Tournament</h1>
        </ModalHeader>
        <form
          onSubmit={(e) => {
            !croppedImage && setShowImageError(true);
            formik.handleSubmit(e);
          }}
        >
          <ModalBody className="">
            <>
              {type === "VIEW" ? (
                <div className="w-[100px] h-[100px] overflow-hidden m-auto border  rounded-xl shadow ">
                  <Image
                    src={croppedImage}
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
                  <Select
                    label="Select a sport"
                    className="max-w-xs"
                    selectedKeys={[formik.values.sport]}
                    // value={}
                    name="sport"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.sport && formik.touched.sport) as boolean
                    }
                    errorMessage={
                      formik.errors.sport &&
                      formik.touched.sport &&
                      formik.errors.sport
                    }
                    isDisabled={type === "VIEW"}
                  >
                    {sportType.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <Input
                    type="text"
                    id="sport"
                    name="sport"
                    label="Sport"
                    value={formik.values.sport}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    
                    // disabled={!isEditable}
                  /> */}
                </div>

                <div>
                  <Input
                    type="text"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.title && formik.touched.title) as boolean
                    }
                    errorMessage={
                      formik.errors.title &&
                      formik.touched.title &&
                      formik.errors.title
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="season"
                    label="Season"
                    value={formik.values.season}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.season && formik.touched.season) as boolean
                    }
                    errorMessage={
                      formik.errors.season &&
                      formik.touched.season &&
                      formik.errors.season
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>

                <div>
                  <DatePicker
                    placeholderText="From date"
                    className={`${
                      formik.errors.fromDate &&
                      formik.touched.fromDate &&
                      "border-red-500"
                    } border p-3 text-sm w-full rounded-xl`}
                    selected={formik.values.fromDate}
                    onChange={(date) => formik.setFieldValue("fromDate", date)}
                    disabled={type === "VIEW"}
                  />
                </div>

                <div>
                  <DatePicker
                    placeholderText="To date"
                    className={`${
                      formik.errors.toDate &&
                      formik.touched.toDate &&
                      "border-red-500"
                    } border p-3 text-sm w-full rounded-xl`}
                    selected={formik.values.toDate}
                    onChange={(date) => formik.setFieldValue("toDate", date)}
                    disabled={type === "VIEW"}
                  />
                </div>

                <div>
                  <DatePicker
                    placeholderText="End date"
                    className={`${
                      formik.errors.endDate &&
                      formik.touched.endDate &&
                      "border-red-500"
                    } border p-3 text-sm w-full rounded-xl`}
                    selected={formik.values.endDate}
                    onChange={(date) => formik.setFieldValue("endDate", date)}
                    disabled={type === "VIEW"}
                  />
                </div>

                <div>
                  <Select
                    label="Select a Type"
                    className="max-w-xs"
                    // value={formik.values.type}
                    selectedKeys={[formik.values.type]}
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.type && formik.touched.type) as boolean
                    }
                    errorMessage={
                      formik.errors.type &&
                      formik.touched.type &&
                      formik.errors.type
                    }
                    isDisabled={type === "VIEW"}
                  >
                    {tournamentType.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <Input
                    type="text"
                    name="type"
                    label="Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.type && formik.touched.type) as boolean
                    }
                    errorMessage={
                      formik.errors.type &&
                      formik.touched.type &&
                      formik.errors.type
                    }
                    // disabled={!isEditable}
                  /> */}
                </div>

                <div>
                  <Input
                    type="text"
                    name="winPoint"
                    label="Win Point"
                    value={formik.values.winPoint}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.winPoint &&
                        formik.touched.winPoint) as boolean
                    }
                    errorMessage={
                      formik.errors.winPoint &&
                      formik.touched.winPoint &&
                      formik.errors.winPoint
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
              </div>
            </>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            {type !== "VIEW" && (
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

            <Button
              color="danger"
              onClick={() => {
                onHide();
                // setCroppedImage("")
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TournamentModal;
