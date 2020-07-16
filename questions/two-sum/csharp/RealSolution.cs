using System.Collections.Generic;

public class Solution
{
	public virtual int[] twoSum(int[] nums, int target)
	{
		int[] res = new int[]{0, 0};
		if (nums == null || nums.Length < 2)
		{
			return res;
		}

		Dictionary<int, int> map = new Dictionary<int, int>();

		for (int i = 0; i < nums.Length; i++)
		{
			if (map.ContainsKey(nums[i]))
			{
				res[0] = map[nums[i]];
				res[1] = i;
				return res;
			}
			else
			{
				map[target - nums[i]] = i;
			}
		}
		return res;
	}
}