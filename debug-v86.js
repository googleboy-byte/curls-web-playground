try {
    const lib = require('./public/v86/libv86.js');
    console.log('Exports:', Object.keys(lib));
    console.log('V86Starter:', lib.V86Starter);
} catch (e) {
    console.error('Error requiring lib:', e.message);
}

// Also try to simulate browser environment if needed
try {
    global.window = global;
    require('./public/v86/libv86.js');
    console.log('Global V86Starter:', global.V86Starter);
    console.log('Global keys:', Object.keys(global).filter(k => k.includes('V86')));
} catch (e) {
    console.error('Error loading in global context:', e.message);
}
