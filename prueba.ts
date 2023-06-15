const o = {
	"name": "This is 'you'",
	"una y otra": "Other"
};

const a = (o) => {
	console.log(o.name);
	if (o === 1) {
		console.log("a");
	}
};

a(o);