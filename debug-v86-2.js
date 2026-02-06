try {
    const lib = require('./public/v86/libv86.js');
    console.log('Type of V86:', typeof lib.V86);
    if (typeof lib.V86 === 'object') {
        console.log('Keys of V86:', Object.keys(lib.V86));
    }
    if (typeof lib.V86 === 'function') {
        console.log('V86 seems to be a constructor/function');
    }
} catch (e) { console.error(e); }
