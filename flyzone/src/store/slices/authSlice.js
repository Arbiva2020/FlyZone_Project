import { createSlice } from "@reduxjs/toolkit";


// the redux logic for the auth feature (in the login and register forms)
const initialState = {
  
  loginForm: {
    userName: '', 
    password:''
  },

  userData: {
    security_level: 1,
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    level: 0,
    next_level: 0,
    mmr: 0,
    badges: 0,
    total_assessments: 0,
    number_of_failurs: 0,
    straight_failurs: 0,
    assessment_overdue: false,
    total_score: 0,
    company_id: 0,
    group_id: 0,
    profileImguser: ''
  },

  registerForm: {
    security_level: 1,
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    level: 0,
    next_level: 0,
    mmr: 0,
    badges: 0,
    total_assessments: 0,
    number_of_failurs: 0,
    straight_failurs: 0,
    assessment_overdue: false,
    total_score: 0,
    company_id: 0,
    group_id: 0,
    profileImguser: ''
  },

  errors: [],

  showPassword: false,

  loggedUser: {userName:'almog'},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleShowPassword: (state, action) => {
      state.showPassword = !state.showPassword;
    },
    setLoginForm: (state, action) => {
      state.loginForm[action.payload.name] = action.payload.value;
    },
    setRegisterForm: (state,action) => {
        state.registerForm[action.payload.name] = action.payload.value;
    },
    resetErrors: (state, action) => {
      state.errors = [];
    },
    setErrors: (state, action) => {
      state.errors.unshift(action.payload);
    },
    setFormSubmit: (state, action) => {
      state.loggedUser = state.loginForm;
    },
    resetToInitialState: (state, action) => {
      state.errors = [];
      state.showPassword = false;
    },
    setUserData: (state, action) => {
      state.userData[action.payload.name] = action.payload.value;
    },
  },
});

export const {
  toggleShowPassword,
  setLoginForm,
  resetErrors,
  setErrors,
  setFormSubmit,
  resetToInitialState,
  setRegisterForm, 
  setUserData
} = authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";


// // the redux logic for the auth feature (in the login and register forms)
// const initialState = {
  
//   loginForm: {
//     userName: '', 
//     password:''
//   },

//   userData: {
//     security_level: 1,
//     username: '',
//     first_name: '',
//     last_name: '',
//     password: '',
//     email: '',
//     level: 0,
//     next_level: 0,
//     mmr: 0,
//     badges: 0,
//     total_assessments: 0,
//     number_of_failurs: 0,
//     straight_failurs: 0,
//     assessment_overdue: false,
//     total_score: 0,
//     company_id: 0,
//     group_id: 0,
//     profileImguser: ''
//   },

//   registerForm: {
//     security_level: 1,
//     username: '',
//     first_name: '',
//     last_name: '',
//     password: '',
//     email: '',
//     level: 0,
//     next_level: 0,
//     mmr: 0,
//     badges: 0,
//     total_assessments: 0,
//     number_of_failurs: 0,
//     straight_failurs: 0,
//     assessment_overdue: false,
//     total_score: 0,
//     company_id: 0,
//     group_id: 0,
//     profileImguser: ''
//   },
//   createNewUser: {
//     username: '',
//     first_name: '',
//     last_name: '',
//     password: '',
//     company_id: 0,
//     group_id: 0,
//     profileImguser: ''
//   },

//   errors: [],
//   success: false,
//   showPassword: false,

//   loggedUser: {userName:'Almog'},
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     toggleShowPassword: (state, action) => {
//       state.showPassword = !state.showPassword;
//     },
//     setLoginForm: (state, action) => {
//       state.loginForm[action.payload.name] = action.payload.value;
//     },
//     setRegisterForm: (state,action) => {
//         state.registerForm[action.payload.name] = action.payload.value;
//     },
//     setCreateNewUserForm: (state,action) => {
//       state.registerForm[action.payload.name] = action.payload.value;
//     },
//     resetErrors: (state, action) => {
//       state.errors = [];
//     },
//     setErrors: (state, action) => {
//       state.errors.unshift(action.payload);
//     },
//     setFormSubmit: (state, action) => {
//       state.loggedUser = state.loginForm;
//     },
//     resetToInitialState: (state, action) => {
//       state.errors = [];
//       state.showPassword = false;
//     },
//     setUserData: (state, action) => {
//       state.userData[action.payload.name] = action.payload.value;
//     },
//   },
// });

// export const {
//   toggleShowPassword,
//   setLoginForm,
//   resetErrors,
//   setErrors,
//   setFormSubmit,
//   resetToInitialState,
//   setRegisterForm, 
//   setUserData, 
//   setCreateNewUserForm
// } = authSlice.actions;

// export default authSlice.reducer;
