
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static ones()
	{
		return new Coords(1, 1);
	}

	static zeroes()
	{
		return new Coords(0, 0);
	}

	absolute()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	dimensionGreatest()
	{
		return (this.x >= this.y ? this.x : this.y);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	double()
	{
		return this.multiplyScalar(2);
	}

	half()
	{
		return this.divideScalar(2);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	// Clonable.

	clone()
	{
		return new Coords(this.x, this.y);
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}
}
